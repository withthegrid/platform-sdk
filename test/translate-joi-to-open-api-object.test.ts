import j2s from 'joi-to-swagger';
import Joi, { Schema } from 'joi';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import parse from 'joi-to-json';
import { controllerGeneratorOptions as addPanel } from '../src/routes/analytics/add-panel';
import { controllerGeneratorOptions as addCommand } from '../src/routes/command/add';
import {
  ControllerGeneratorOptions, ControllerGeneratorOptionsWithClient,
  ControllerGeneratorOptionsWithClientAndSupplier,
  ControllerGeneratorOptionsWithoutClientOrSupplier,
  ControllerGeneratorOptionsWithSupplier,
} from '../src';

test('test joi-to-swagger', () => {
  const innerSchema = Joi.object().keys({
    innerId: Joi.number().integer().positive().required(),
    innerName: Joi.string(),
  });
  const outerSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    name: Joi.string(),
    email: Joi.string().email().required(),
    created: Joi.date().allow(null),
    active: Joi.boolean().default(true),
    inner: innerSchema,
  });
  const components1 = j2s(innerSchema).components;
  const jsonSchema = j2s(outerSchema, components1).swagger;
  console.log(JSON.stringify(jsonSchema));
});

test('test joi-to-json', () => {
  const jsonSchema = parse(addPanel.body);
  console.log('jsonSchema');
  console.log(JSON.stringify(jsonSchema));
});

test('test panel to json', () => {
  type ControllerGeneratorOptionTypes =
    ControllerGeneratorOptionsWithClientAndSupplier
    | ControllerGeneratorOptionsWithSupplier
    | ControllerGeneratorOptionsWithClient
    | ControllerGeneratorOptionsWithoutClientOrSupplier
    | ControllerGeneratorOptions;

  function determineResponseContent(
    controllerGeneratorOptions: ControllerGeneratorOptionTypes,
  ): string {
    if (controllerGeneratorOptions.response !== undefined) {
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

  function determinePathSpecification(
    controllerGeneratorOptions: ControllerGeneratorOptionTypes,
  ): string {
    return `
    "${controllerGeneratorOptions.path}": {
      "${controllerGeneratorOptions.method}": {
        "responses": {
          ${determineResponseContent(controllerGeneratorOptions)}
        },
        "requestBody" : {
          "content" : {
            "text/json" : {
              "schema": ${JSON.stringify(j2s(controllerGeneratorOptions.body as Schema).swagger)}
            }
          }
        }
      }
    }`;
  }

  // During the build of platform sdk we could run code that does about the following:

  // Do some loop over all files in the routes directory and extract controllerGeneratoroptions
  const controllerGeneratorOptions = [addPanel, addCommand];
  // Do some mapping from the controllerGeneratoroptions to the open api specification
  const pathSwaggerDefinitions = controllerGeneratorOptions.map(determinePathSpecification);
  // Create the open api specification
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
  // create the static webpage that will be hosted as the api documentation
  // To get an idea of how easy that last part could potentially be just save the json from console
  // into a file and upload the file here: https://redocly.github.io/redoc/
});
