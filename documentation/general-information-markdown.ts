function createGeneralInformationMd(): string {
  return `
# Getting started

## Introduction

This document provides information on how to access the withthegrid application programmatically.

Programmatic access to the application requires a machine account. Almost everything a user can do in the user interface of the application, can also be done with a machine account. To obtain one, contact us at <a href="mailto:info@withthegrid.com">info&#x40;withthegrid.com</a>.
Our programmatic interface is a REST JSON API that is accessible through HTTPS. Next to the raw HTTP queries (with examples in cURL), we provide a Javascript(Typescript) SDK. Select in the top bar whether you want to see the documentation for cURL or the Javascript SDK.
To add the SDK to your javascript package, type \`\`\`npm i @withthegrid/platform-sdk\`\`\` into your console.

## Environment types

There are two types of environments in our application: monitoring environments and connectivity environments.

In *monitoring environments*, you store geospatial and other static information on infrastructural assets. You can create condition reports on the condition of these assets, resulting in measurement time series. Reports on asset can be manually created or by connecting an (IoT) device. The condition of the assets is monitored based on the condition reports and issues are automatically created when anomalies are detected.

In *connectivity environments*, developers of devices and external systems can:
- manage the provisioning of their devices by means of HTTPS webhooks or client certificates (through CoAP over DTLS or HTTPS)
- define event handlers in TypeScript that parse incoming payloads into condition reports, return instructions to devices (including FOTA) and monitor device health.
- monitor activity of your devices
- Generate claim tokens to share with the customer so they can securely claim the devices in their monitoring environment.

## Rights & Routes

To interact with the API you can make HTTP requests to the routes in the left-hand menu. Most of these need authentication.
Obtain a JSON webtoken from the [Login route](#tag/authentication). The following rights exist for the *monitoring environments*:

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

For the *connectivity environments* there is only one right: ENVIRONMENT_ADMIN.


### Headers

All requests need a header specifying the version of the api that is being used by the client for example:
\`\`\`Api-Version: 4\`\`\`

As the route documentation will show, the request body and its response are almost always JSON encoded (with corresponding \`\`\`Content-Type: application/json\`\`\` header).



## Schemas

Some objects in requests or responses are used multiple times. Those are extracted as models and listed separately under the [schemas section](#tag/models).

## Sdk

There is a SDK available that can be used to make calling the api more easy. The following is an example for creating a location (pinGroup).
\`\`\`
import PlatformSdk, { errors } from '@withthegrid/platform-sdk';

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

export default createGeneralInformationMd;
