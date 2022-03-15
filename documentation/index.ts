// eslint-disable-next-line import/no-extraneous-dependencies
import j2s, { ComponentsSchema } from 'joi-to-swagger';
import { Schema } from 'joi';
import path from 'path';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as widdershins from 'widdershins';
import {
  apiVersion,
  ControllerGeneratorOptions,
  ControllerGeneratorOptionsWithClient,
  ControllerGeneratorOptionsWithClientAndSupplier,
  ControllerGeneratorOptionsWithoutClientOrSupplier,
  ControllerGeneratorOptionsWithSupplier, IndividualRoutes, routes,
} from '../src';

type ControllerGeneratorOptionTypes =
  ControllerGeneratorOptionsWithClientAndSupplier
  | ControllerGeneratorOptionsWithSupplier
  | ControllerGeneratorOptionsWithClient
  | ControllerGeneratorOptionsWithoutClientOrSupplier
  | ControllerGeneratorOptions;

type withTagAndSummary = { tag: string, summary: string };
type RouteToDocument = ControllerGeneratorOptionTypes & withTagAndSummary;

const componentsForSchema: (ComponentsSchema | undefined)[] = [];
const tags: Set<string> = new Set<string>();

function determineRequestBodyContent(
  controllerGeneratorOptions: ControllerGeneratorOptionTypes,
): string {
  if (controllerGeneratorOptions.body !== undefined) {
    if (typeof controllerGeneratorOptions.body === 'function') {
      const { swagger, components } = j2s(
        controllerGeneratorOptions.body(apiVersion) as Schema,
      );
      componentsForSchema.push(components);
      return `,
        "requestBody" : {
          "content" : {
            "text/json" : {
              "schema": ${JSON.stringify(swagger)}
            }
          }
        }`;
    }
    const { swagger, components } = j2s(controllerGeneratorOptions.body as Schema);
    componentsForSchema.push(components);
    return `,
    "requestBody" : {
      "content" : {
        "text/json" : {
          "schema": ${JSON.stringify(swagger)}
        }
      }
    }`;
  }
  return '';
}

function determineResponseContent(
  controllerGeneratorOptions: ControllerGeneratorOptionTypes,
): string {
  if (controllerGeneratorOptions.response !== undefined) {
    if (typeof controllerGeneratorOptions.response === 'function') {
      const { swagger, components } = j2s(
        controllerGeneratorOptions.response(apiVersion) as Schema,
      );
      componentsForSchema.push(components);
      return `
        "200": {
          "description": "Success",
          "content": {
            "text/json": {
               "schema": ${JSON.stringify(swagger)}
            }
          }
        }`;
    }
    const { swagger, components } = j2s(controllerGeneratorOptions.response as Schema);
    componentsForSchema.push(components);
    return `
        "200": {
          "description": "Success",
          "content": {
            "text/json": {
               "schema": ${JSON.stringify(swagger)}
            }
          }
        }`;
  }
  return `
      "204": {
        "description": "No Content"
      }`;
}

function determineMethodsContent(routesToDocument: RouteToDocument[], tag: string) {
  function determineDescription(
    description?: string,
    right?: { supplier?: string, environment?: string },
  ) {
    if ((description === undefined) && (right === undefined)) {
      return '';
    }
    let rightsString = '';
    if (right !== undefined) {
      rightsString += '\\n\\n';
      if (right.supplier !== undefined) {
        rightsString += `Right needed *connectivity environment*: ${right.supplier}\\n`;
      }
      if (right.environment !== undefined) {
        rightsString += `Right needed *monitoring environment*: ${right.environment}\\n`;
      }
    }
    return `"description": "${description !== undefined ? description : ''}${right !== undefined ? ` ${rightsString}` : ''}",`;
  }

  const methodContentParts: string [] = [];
  tags.add(tag);
  routesToDocument.forEach((route) => {
    methodContentParts.push(`"${route.method}": {
    ${route.summary !== undefined ? `"summary": "${route.summary}",` : ''}
    ${determineDescription(route.description, route.right)}
    "responses": {
      ${determineResponseContent(route)}
    }
    ${determineRequestBodyContent(route)},
    "tags": ["${tag}"]
  }`);
  });
  return methodContentParts.join(',');
}

function determinePathSpecification(
  controllerGeneratorOptions: RouteToDocument[],
): string {
  const pathSpecificationParts: string[] = [];
  const groupedRoutes: Record<string, RouteToDocument[]> = {};
  controllerGeneratorOptions.forEach((controllerGeneratorOption) => {
    const key = controllerGeneratorOption.path;
    if (groupedRoutes[key] === undefined) {
      groupedRoutes[key] = [];
    }
    groupedRoutes[key].push(controllerGeneratorOption);
  });
  Object.entries(groupedRoutes).forEach((record) => {
    pathSpecificationParts.push(
      `"/${record[1][0].tag}${record[0]}": {
      ${determineMethodsContent(record[1], record[1][0].tag)}
    }`,
    );
  });

  return pathSpecificationParts.join(',');
}

function determineWiddershinsOptions() {
  return {
    codeSamples: true,
    httpsnippet: false,
    templateCallback(templateName: any, stage: any, data: any) { return data; },
    theme: 'darkula',
    search: true,
    sample: true, // set false by --raw,
    discovery: false,
    includes: [],
    shallowSchemas: false,
    tocSummary: false,
    headings: 2,
    yaml: false,
  };
}

function determineSchemaSpecifications(schemaSpecifications: (ComponentsSchema | undefined)[]) {
  const setOfSchemas: Set<string> = new Set<string>();
  const convertedSchemaSpecifications: string[] = [];
  schemaSpecifications.forEach((schemaSpecification) => {
    if (schemaSpecification !== undefined && schemaSpecification.schemas !== undefined) {
      const schemas = schemaSpecification.schemas!;
      const schemaNames = Object.getOwnPropertyNames(schemaSpecification.schemas);
      schemaNames.forEach((schemaName: string) => {
        if (!setOfSchemas.has(schemaName)) {
          setOfSchemas.add(schemaName);
          const schema = schemas[schemaName];
          convertedSchemaSpecifications.push(`"${schemaName}": ${JSON.stringify(schema)}`);
        }
      });
    }
  });
  return convertedSchemaSpecifications;
}

function createGeneralInformationMd(): string {
  return `
# Getting started

## Introduction

This document provides information on how to access the withthegrid application programmatically.

Programmatic access to the application requires a machine account. Almost everything a user can do in the user interface of the application, can also be done with a machine account. To obtain one, contact us at info@withthegrid.com.
Our programmatic interface is a REST JSON API that is accessible through HTTPS. Next to the raw HTTP queries (with examples in cURL), we provide a Javascript(Typescript) SDK. Select in the top bar whether you want to see the documentation for cURL or the Javascript SDK.
To add the SDK to your javascript package, type

\`\`\`npm i @withthegrid/platform-sdk into your console.\`\`\`

## Environment types

There are two types of environments in our application: monitoring environments and connectivity environments.

In *monitoring environments*, you store geospatial and other static information on infrastructural assets. You can create condition reports on the condition of these assets, resulting in measurement time series. Reports on asset can be manually created or by connecting an (IoT) device. The condition of the assets is monitored based on the condition reports and issues are automatically created when anomalies are detected.

In *connectivity environments*, developers of devices and external systems can:
- manage the provisioning of their devices by means of HTTPS webhooks or client certificates (through CoAP over DTLS, MQTT over TLS or HTTPS)
- define event handlers in TypeScript that parse incoming payloads into condition reports, return instructions to devices (including FOTA) and monitor device health.
- monitor activity of your devices
- Generate claim tokens to share with the customer so they can securely claim the devices in their monitoring environment.

## Rights

To interact with the API you can make HTTP requests to the routes in the left hand menu. Most of these need authentication.
Obtain a JSON webtoken from the [authentication route](#tag/authentication). The following rights exist for the *monitoring environments*:

| Right       | Description               |
|------------ | ------------------------- |
| READ        | View (except audit trail) |
| STATIC      | Modify static data        |
| ISSUES      | Manage issues             |
| AUDIT_TRAIL | View audit trail          |
| USERS       | Manage users              |
| EXPORT      | Export data               |
| SENSORS     | Manage devices            |
| REPORTS     | Manage condition reports  |

For the *connectivity environments* there is only one right. ENVIRONMENT_ADMIN.

## Schemas

Some objects in requests or responses are used multiple times. Those are extracted as models and listed separately under the [schemas section](#tag/models).

## Sdk

There is a SDK available that can be used to make calling the api more easy. The following is an example for creating a location (pinGroup). It is written for Node, but can easily be altered for use in a browser environment
\`\`\`
// The .default in the require statement is necessary as  SDK is written in
// Typescript, which exports the default under a default key, see
// https://github.com/microsoft/TypeScript/issues/2719.
const PlatformSdk = require('@withthegrid/platform-sdk').default;
const { errors } = require('@withthegrid/platform-sdk');

const example = async () => {
  const platformSdk = new PlatformSdk();

  // Here you use the assertion that is provided to you when the machine account is created
  await platformSdk.machineLogin('your assertion');
  
  /*
    A controller (addPinGroup in this example) takes a single parameter, which
    is an object with three possible keys: params, query and body. It depends on
    the route what the signature should be.
    
    A controller returns an object with the following signature:
    
    {
      request: {
        query: validatedQuery,
        body: validatedBody,
        params: validatedParams,
      } as EffectiveRequestImplementation,
      response: responsePromise as Promise<ResponseImplementation>,
    }

    The request is based on the provided parameter, with default values added to
    it. Response is an object with a signature that depends on the route. An
    application of the cancelToken is shown below.
  */
  const result = await platformSdk.routes.graph.addPinGroup({
    body: {
      symbolKey: 'cp-pole',
      geometry: {
        type: 'Point',
        coordinates: [5.078397, 52.100985],
      },
      fields: {},
    },
  });
  /*
    With a 1 in 10 chance, cancel the request. this does not make sense in
    practice, but demonstrates the use of cancel tokens A more useful
    application is an autocomplete text field, where suggestions are updated as
    the user is typing. New user input would trigger a new request. The old one
    should then be canceled as its response will be ignored.

    As the request might have already reached the server, you do not know
    whether the request has been processed. Using this on requests that change
    the state of an object on the server (PUT, POST and DELETE requests) does
    not make sense.
  */
  if (Math.random() > 0.9) {
    setImmediate(() => {
      result.cancelToken.cancel();
    });
  }

  const response = await result.response;
  console.log(\`Added a new pinGroup with hashId \${response.hashId}\`);

  process.exit(0);
}

example().catch((e) => {
  if (e instanceof errors.CommsCanceled) {
    // will be triggered when you call result.cancelToken.cancel();
    console.log('You have canceled the request');
  } else if (e instanceof errors.Base) {
    console.log(e.formattedMessage);
    console.error(\`Stack trace: \${e.stack}\`);
  } else if (e instanceof Error) {
    console.error(\`Error: \${e.message}\`);
    console.error(\`Stack trace: \${e.stack}\`);
  } else {
    console.error(\`Not-an-object error: \${e}\`);
  }
  process.exit(1);
});
\`\`\`

## Hashids

Almost all objects are identified by their hashId. This is an alphanumeric string uniquely identifying that object within its own object type. So the same hashId can occur for a Command and a PinGroup, but they identify different objects.

## Form fields

In some object types, users can store custom data. The fields that can be used to store data in these objects are defined in a [field configuration](#section/updatableFieldConfigurations). The UI renders this field configuration as a form.

The following objects support these form fields:


| Object with field | Configured in                                                                                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| edges             | monitoring environment under [fieldConfigurations.edges](#section/edge) for fields                                                                             |
| grids             | monitoring environment under [fieldConfigurations.grids](#section/grid) for fields                                                                             |
| pin groups        | monitoring environment under [fieldConfigurations.pinGroups](#section/pinGroup) for fields and device type under pinGroupFieldConfigurations for deviceFields. |
| nodes             | monitoring environment under [fieldConfigurations.nodes](#section/node) for fields                                                                             |
| pin               | monitoring environment under [fieldConfigurations.pins](#section/pin) for fields and device type under channels[].pinFieldConfigurations for deviceFields.     |
| reports           | manual [report type](#section/supplierReportType) and device report type for fields                                                                            |
| commands          | [command type](#section/commandType) for fields                                                                                                                |
| devices           | [device type](#section/deviceType) for fields                                                                                                                  |

The name of an edge, grid, pin group, node and pin objects is defined as the value of the first field in the field configuration. At least one key is therefore required in these fields properties.

## User defined code

| User defined code                                                                                       | Location of the code editor in the ui where commented templates can be found                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| form field                                                                                              | Everywhere where form fields can be defined. For example in the "Monitoring environment" settings, under "Form fields". Click on a property and press "Show advanced options". The 5 UDFs can be viewed using the code editor at the bottom. |
| device supplier certificate [identifier](#tag/supplier-certificate/paths/~1supplier-certificate~1/post) | In the "Connectivity environment" under "Device authentication", "Client certificate access". Click on a certificate and press "Edit the identifier" to reach the code editor.                                                               |
| device supplier webhook [identifier](#tag/supplier-webhook/paths/~1supplier-webhook~1/post)             | In the "Connectivity environment" under "Device authentication", "Webhook access". Click on a webhook and press "Edit the identifier" to reach the code editor.                                                                              |
| device type [eventHandler](#tag/device-type/paths/~1device-type~1/post)                                 | In the "Connectivity environment" under "Device types". Click on a device type and press "Edit the event handler" to reach the code editor.                                                                                                  |
| device condition report [parser](#tag/supplier-report-type/paths/~1supplier-report-type~1/post)         | In the "Connectivity environment" under "Report types". Click on a report type and press "Edit the parser" to reach the code editor.                                                                                                         |
`;
}

async function go() {
  console.log('starting documentation generation');
  const controllerGeneratorOptionsArray: RouteToDocument[][] = [];
  Object.entries(routes).forEach(([routerName, routeGroup]) => {
    const className = `${routerName.charAt(0).toUpperCase()}${routerName.substring(1)}Route`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = (IndividualRoutes as any)[className] as { auth: boolean; routerPath: string };
    const { routerPath } = router;
    const groupedRoutes: (RouteToDocument)[] = [];
    Object.entries(routeGroup).forEach(([controllerName, controller]) => {
      const route = controller.controllerGeneratorOptions as ControllerGeneratorOptions;
      const routeIdentifier = `${controllerName} (${route.method.toUpperCase()} ${routerPath}${route.path})`;
      console.log(`adding route ${routeIdentifier}`);
      groupedRoutes.push(Object.assign(route, { tag: routerPath, summary: controllerName }));
    });
    controllerGeneratorOptionsArray.push(groupedRoutes);
  });

  const pathSwaggerDefinitions = controllerGeneratorOptionsArray.map(determinePathSpecification);
  const schemaDefinitions = determineSchemaSpecifications(componentsForSchema);
  const openApi = `
  {
    "openapi": "3.0.1",
    "info": {
        "title": "platform-sdk",
        "description": "This document provides information on how to access the withthegrid application programmatically.",
        "contact": {
          "name": "API support",
          "email": "info@withthegrid.com",
          "url": "https://withthegrid.com/"
        },
        "x-logo": {
          "url": "https://withthegrid.com/wp-content/uploads/2019/10/wtg-logo.svg",
          "altText": "withthegrid" 
        },
        "version": "${apiVersion}"
    },
    "tags": [{"name":"${Array.from(tags).join('"},{"name":"')}"}],
    "paths": {
      ${pathSwaggerDefinitions.join(',')}
    },
    "components": {
      "schemas": {
        ${schemaDefinitions.join(',')}
      }
    },
    "securitySchemes": {
      "jwt-token": {
        "description": "On login you get a token to access all other url's",
        "type": "http",
        "scheme": "bearer",
        "name": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }`;

  // write the specification to file
  const filePath = path.resolve(__dirname, 'open-api.json');
  fs.writeFileSync(filePath, JSON.stringify(JSON.parse(openApi), null, 2));

  // Postprocess open api for redoc
  console.log('postprocess api specification for Redoc');
  const widdershinsApiObj = JSON.parse(openApi);
  const openApiObject = JSON.parse(openApi);
  await widdershins.convert(
    widdershinsApiObj,
    determineWiddershinsOptions(),
  ).then((str: string) => {
    const filePathMarkdown = path.resolve(__dirname, 'widdershins-api.md');
    fs.writeFileSync(filePathMarkdown, str);
    const matches = str.matchAll(/## (get|post|delete|put)__(.*_?)+/g);
    let match = matches.next();
    do {
      const method = match.value[1];
      const url: string = `/${match.value[2].replaceAll('_', '/')}`;
      const codeSamples: {lang: string, label: string, source: string}[] = [];
      const index = match.value.index;
      const substr = str.substring(index);
      const codeStringMatches = substr.matchAll(/(```)(shell|http|javascript|ruby|python|php|java|go)((.*\n)+?)(```)/g);
      let codeStringMatch = codeStringMatches.next();
      let i = 0;
      do {
        codeSamples.push(
          {
            lang: codeStringMatch.value[2],
            label: codeStringMatch.value[2],
            source: codeStringMatch.value[3],
          },
        );
        i += 1;
        codeStringMatch = codeStringMatches.next();
      } while (i < 8);
      openApiObject.paths[url][method]['x-code-samples'] = codeSamples;
      match = matches.next();
    } while (match !== undefined && match.done === false);
  });

  openApiObject.info['x-logo'] = {
    url: 'https://withthegrid.com/wp-content/uploads/2019/10/wtg-logo.svg',
    altText: 'withthegrid',
  };

  const descriptionArray: string[] = [];
  schemaDefinitions.sort();
  schemaDefinitions.forEach((schemaDefinition) => {
    const match = schemaDefinition.match(/"([a-z,A-Z]+?)"/);
    if (match !== null) {
      descriptionArray.push(`##  ${match[1]}\n\n<SchemaDefinition schemaRef="#/components/schemas/${match[1]}"/>`);
    }
  });
  openApiObject.tags = openApiObject.tags.map((tag: { name: string }) => ({ name: tag.name, 'x-displayName': `${tag.name[0].toUpperCase()}${tag.name.slice(1)}` }));
  openApiObject.tags.push({
    name: 'models',
    'x-displayName': 'Schemas',
    description: descriptionArray.join('\n\n'),
  });

  openApiObject.info.description = createGeneralInformationMd();

  const filePathRedoc = path.resolve(__dirname, 'redoc.json');
  fs.writeFileSync(filePathRedoc, JSON.stringify(openApiObject, null, 2));
}

go()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
