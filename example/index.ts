import PlatformSdk, { errors } from '../src';

const example = async (): Promise<void> => {
  const platformSdk = new PlatformSdk();
  await platformSdk.machineLogin('enter your assertion here');

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
      cancelToken,
    }

    The request is based on the provided parameter, with default values added to
    it. Response is an object with a signature that depends on the route. An
    application of the cancelToken is shown below.
  */
  const result = platformSdk.routes.graph.addPinGroup({
    body: {
      symbolKey: 'cp-pole',
      geometry: {
        type: 'Point',
        coordinates: [5.078397, 52.100985],
      },
      fields: { id: 'My pin group' },
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
  console.log(`Added a new location (pinGroup) with hashId ${response.hashId}`);

  /*
     ..TableController routes are convenience functions that return a table controller
     that can be used to easily perform paged requests
  */
  const tableController = platformSdk.routes.issue.findTableController({ rowsPerPage: 10 });
  const pages = await tableController.acquire();
  console.log(JSON.stringify(tableController.get(pages - 1), null, 2));

  process.exit(0);
};

example().catch((e) => {
  if (e instanceof errors.CommsCanceled) {
    // will be triggered when you call result.cancelToken.cancel();
    console.log('You have canceled the request');
  } else if (e instanceof errors.Base) {
    console.log(e.formattedMessage);
    console.error(`Stack trace: ${e.stack}`);
  } else if (e instanceof Error) {
    console.error(`Error: ${e.message}`);
    console.error(`Stack trace: ${e.stack}`);
  } else {
    console.error(`Not-an-object error: ${e}`);
  }
  process.exit(1);
});
