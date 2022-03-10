import j2s from 'joi-to-swagger';
import { Schema } from 'joi';
import PlatformSdk, {
  apiVersion,
  ControllerGeneratorOptions,
  ControllerGeneratorOptionsWithClient,
  ControllerGeneratorOptionsWithClientAndSupplier,
  ControllerGeneratorOptionsWithoutClientOrSupplier,
  ControllerGeneratorOptionsWithSupplier,
} from '../src';
import { controllerGeneratorOptions as analyticsAddPanel } from '../src/routes/analytics/add-panel';
import { controllerGeneratorOptions as analyticsDeletePanel } from '../src/routes/analytics/delete-panel';
import { controllerGeneratorOptions as analyticsFind } from '../src/routes/analytics/find';
import { controllerGeneratorOptions as analyticsFindPanel } from '../src/routes/analytics/find-panel';
import { controllerGeneratorOptions as analyticsGetPanel } from '../src/routes/analytics/get-panel';
import { controllerGeneratorOptions as analyticsUpdatePanel } from '../src/routes/analytics/update-panel';
import { controllerGeneratorOptions as authenticationMachineLogin } from '../src/routes/authentication/machine-login';
import { controllerGeneratorOptions as chartGet } from '../src/routes/chart/get';
import { controllerGeneratorOptions as chartGetPanel } from '../src/routes/chart/get-panel';
import { controllerGeneratorOptions as chartUpdatePanel } from '../src/routes/chart/update-panel';
import { controllerGeneratorOptions as commandAdd } from '../src/routes/command/add';
import { controllerGeneratorOptions as commandDelete } from '../src/routes/command/delete';
import { controllerGeneratorOptions as commandFind } from '../src/routes/command/find';
import { controllerGeneratorOptions as commandGet } from '../src/routes/command/get';
import { controllerGeneratorOptions as commandTypeAdd } from '../src/routes/command-type/add';
import { controllerGeneratorOptions as commandTypeDelete } from '../src/routes/command-type/delete';
import { controllerGeneratorOptions as commandTypeFind } from '../src/routes/command-type/find';
import { controllerGeneratorOptions as commandTypeGet } from '../src/routes/command-type/get';
import { controllerGeneratorOptions as commandTypeUpdate } from '../src/routes/command-type/update';
import { controllerGeneratorOptions as deviceClaim } from '../src/routes/device/claim';
import { controllerGeneratorOptions as deviceDelete } from '../src/routes/device/delete';
import { controllerGeneratorOptions as deviceFind } from '../src/routes/device/find';
import { controllerGeneratorOptions as deviceGet } from '../src/routes/device/get';
import { controllerGeneratorOptions as deviceGetClaimToken } from '../src/routes/device/get-claim-token';
import { controllerGeneratorOptions as deviceLink } from '../src/routes/device/link';
import { controllerGeneratorOptions as deviceUnclaim } from '../src/routes/device/unclaim';
import { controllerGeneratorOptions as deviceUnlink } from '../src/routes/device/unlink';
import { controllerGeneratorOptions as deviceUpdate } from '../src/routes/device/update';

import {
  AnalyticsRoute, CommandRoute, CommandTypeRoute, DeviceRoute,
} from '../src/routes';
import AuthenticationRoute from '../src/routes/authentication';
import ChartRoute from '../src/routes/chart';

type ControllerGeneratorOptionTypes =
  ControllerGeneratorOptionsWithClientAndSupplier
  | ControllerGeneratorOptionsWithSupplier
  | ControllerGeneratorOptionsWithClient
  | ControllerGeneratorOptionsWithoutClientOrSupplier
  | ControllerGeneratorOptions;

type withTag = {tag: string};
type RouteToDocument = ControllerGeneratorOptionTypes & withTag;

function determineRequestBodyContent(
  controllerGeneratorOptions: ControllerGeneratorOptionTypes,
): string {
  if (controllerGeneratorOptions.body !== undefined) {
    return `,
    "requestBody" : {
      "content" : {
        "text/json" : {
          "schema": ${JSON.stringify(j2s(controllerGeneratorOptions.body as Schema).swagger)}
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
      return `
        "200": {
          "description": "Success",
          "content": {
            "text/json": {
               "schema": ${JSON.stringify(j2s(controllerGeneratorOptions.response(apiVersion) as Schema).swagger)}
            }
          }
        }`;
    }
    return `
        "200": {
          "description": "Success",
          "content": {
            "text/json": {
               "schema": ${JSON.stringify(j2s(controllerGeneratorOptions.response as Schema).swagger)}
            }
          }
        }`;
  }
  return `
      "204": {
        "description": "No Content"
      }`;
}

function determineMethodsContent(routes: RouteToDocument[]) {
  const methodContentParts: string [] = [];
  routes.forEach((route) => {
    methodContentParts.push(`"${route.method}": {
    "responses": {
      ${determineResponseContent(route)}
    }
    ${determineRequestBodyContent(route)}
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
      ${determineMethodsContent(record[1])}
    }`,
    );
  });

  return pathSpecificationParts.join(',');
}

async function go() {
  console.log('starting documentation generation');
  const platformSdk = new PlatformSdk();
  const routes = platformSdk.routes;
  const routeNames = Object.keys(routes).filter((rn) => rn !== 'comms');
  const routesNeedingDocumentation: string[] = [];

  for (let i = 0; i < routeNames.length; i += 1) {
    console.log(routeNames[i]);
    const route = (routes as any)[routeNames[i]];
    const methodsOnRoute = Object.keys(route).filter((mor) => mor !== 'comms').filter((mor) => !mor.includes('TableController'));
    for (let j = 0; j < methodsOnRoute.length; j += 1) {
      const method = (route as any)[methodsOnRoute[j]];
      routesNeedingDocumentation.push(method);
    }
  }
  console.log(routesNeedingDocumentation);

  const controllerGeneratorOptionsArray = [[
    Object.assign(analyticsAddPanel, { tag: AnalyticsRoute.routerPath }),
    Object.assign(analyticsDeletePanel, { tag: AnalyticsRoute.routerPath }),
    Object.assign(analyticsFind, { tag: AnalyticsRoute.routerPath }),
    Object.assign(analyticsFindPanel, { tag: AnalyticsRoute.routerPath }),
    Object.assign(analyticsGetPanel, { tag: AnalyticsRoute.routerPath }),
    Object.assign(analyticsUpdatePanel, { tag: AnalyticsRoute.routerPath }),
  ], [
    Object.assign(authenticationMachineLogin, { tag: AuthenticationRoute.routerPath }),
  ], [
    Object.assign(chartGet, { tag: ChartRoute.routerPath }),
    Object.assign(chartGetPanel, { tag: ChartRoute.routerPath }),
    Object.assign(chartUpdatePanel, { tag: ChartRoute.routerPath }),
  ], [
    Object.assign(commandAdd, { tag: CommandRoute.routerPath }),
    Object.assign(commandDelete, { tag: CommandRoute.routerPath }),
    Object.assign(commandFind, { tag: CommandRoute.routerPath }),
    Object.assign(commandGet, { tag: CommandRoute.routerPath }),
  ], [
    Object.assign(commandTypeAdd, { tag: CommandTypeRoute.routerPath }),
    Object.assign(commandTypeDelete, { tag: CommandTypeRoute.routerPath }),
    Object.assign(commandTypeFind, { tag: CommandTypeRoute.routerPath }),
    Object.assign(commandTypeGet, { tag: CommandTypeRoute.routerPath }),
    Object.assign(commandTypeUpdate, { tag: CommandTypeRoute.routerPath }),
  ], [
    Object.assign(deviceClaim, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceDelete, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceFind, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceGet, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceGetClaimToken, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceLink, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceUnclaim, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceUnlink, { tag: DeviceRoute.routerPath }),
    Object.assign(deviceUpdate, { tag: DeviceRoute.routerPath }),
  ]];

  const pathSwaggerDefinitions = controllerGeneratorOptionsArray.map(determinePathSpecification);
  const openApi = `{
    "openapi": "3.0.1",
    "info": {
        "title": "platform-sdk",
        "version": "v1"
    },
    "paths": {
        ${pathSwaggerDefinitions.join(',')}
    }}`;
  // Validate the schema against the json schema of the open api specification
  // write the specification to file
  console.log(JSON.stringify(JSON.parse(openApi)));

  // // Get the files as an array
  // const routeDirectories = await fs.promises.readdir('src/routes', { withFileTypes: true });
  // for (let i = 0; i < routeDirectories.length; i += 1) {
  //   if (routeDirectories[i].isDirectory()) {
  //     const filesInRoute = await fs.promises.readdir(`src/routes/${routeDirectories[i].name}/`);
  //     for (let j = 0; j < filesInRoute.length; j += 1) {
  //       if (!(filesInRoute[j] === 'index.ts' || filesInRoute[j] === 'routes.ts')) {
  //         const file = await fs.promises.readFile(`src/routes/${routeDirectories[i].name}/${filesInRoute[j]}`);
  //         console.log(file.toString().substring(0, 10));
  //       }
  //     }
  //   }
  // }

  console.log('generating open api json');
  console.log('generating documentation website');
  console.log('finished documentation generation');
}

go()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e.stack);
    process.exit(1);
  });
