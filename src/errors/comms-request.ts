import BaseError from './base';

class CommsRequestError extends BaseError {
  constructor(
    readonly requestMethod: string,
    readonly requestPath: string,
    readonly requestParams?: object,
    readonly requestData?: any,
  ) {
    super('comms_request', 'The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js');
  }

  get formattedMessage(): string {
    let formatted = super.formattedMessage;
    formatted += `\nrequest method: ${this.requestMethod}`;
    formatted += `\nrequest path: ${this.requestPath}`;
    formatted += `\nrequest params: ${JSON.stringify(this.requestParams, null, 2)}`;
    formatted += `\nrequest data: ${JSON.stringify(this.requestData, null, 2)}`;

    return formatted;
  }
}

export default CommsRequestError;
