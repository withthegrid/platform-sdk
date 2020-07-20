/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosRequestConfig } from 'axios';

import BaseError from './base';

class CommsResponseError extends BaseError {
  constructor(
    readonly data: any,
    readonly status: any,
    readonly headers: any,
    readonly requestMethod: string,
    readonly requestPath: string,
    readonly requestParams?: AxiosRequestConfig['params'],
    readonly requestData?: AxiosRequestConfig['data'],
  ) {
    super('comms_response', 'The request was made and the server responded with a status code that falls out of the range of 2xx');
  }

  get formattedMessage(): string {
    let formatted = super.formattedMessage;
    formatted += `\nrequest method: ${this.requestMethod}`;
    formatted += `\nrequest path: ${this.requestPath}`;
    formatted += `\nrequest params: ${JSON.stringify(this.requestParams, null, 2)}`;
    formatted += `\nrequest data: ${JSON.stringify(this.requestData, null, 2)}`;
    formatted += `\nresponse status code: ${this.status}`;
    formatted += `\nresponse headers: ${JSON.stringify(this.headers, null, 2)}`;
    formatted += `\nresponse data: ${JSON.stringify(this.data, null, 2)}`;

    return formatted;
  }
}

export default CommsResponseError;
