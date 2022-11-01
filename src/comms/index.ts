import Axios, {
  AxiosInstance,
  CancelTokenSource,
  AxiosRequestConfig,
  Method,
  AxiosError,
} from 'axios';

import CommsRequestError from '../errors/comms-request';
import CommsResponseError from '../errors/comms-response';
import CommsCanceledError from '../errors/comms-canceled';
import CommsError from '../errors/comms';
import BaseError from '../errors/base';
import BillingError from '../errors/billing';
import OutdatedClientError from '../errors/outdated-client';
import AuthenticationError from '../errors/authentication';

class Comms {
  axios: AxiosInstance;

  loggedIn = false;

  constructor(baseURL: string, readonly apiVersion: number) {
    const axios = Axios.create({
      headers: {
        Pragma: 'no-cache', // required for internet explorer
      },
      baseURL,
    });

    axios.defaults.headers.common['Api-Version'] = `${apiVersion}`;

    this.axios = axios;
  }

  login(jwt: string, environmentHashId?: string, type = 'environment'): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
    this.changeEnvironment(environmentHashId, type);
    this.loggedIn = true;
  }

  changeEnvironment(environmentHashId?: string, type = 'environment'): void {
    if (environmentHashId === undefined) {
      delete this.axios.defaults.headers.common['Environment-Hash-Id'];
    } else if (type === 'environment') {
      this.axios.defaults.headers.common['Environment-Hash-Id'] = environmentHashId;
    } else {
      this.axios.defaults.headers.common['Environment-Hash-Id'] = `${type}:${environmentHashId}`;
    }
  }

  get environment(): { type: string; hashId: string } | undefined {
    if (typeof this.axios.defaults.headers.common['Environment-Hash-Id'] !== 'string') {
      return undefined;
    }
    const parts = this.axios.defaults.headers.common['Environment-Hash-Id'].split(':', 2);
    if (parts.length === 1) {
      return { type: 'environment', hashId: parts[0] };
    }
    return { type: parts[0], hashId: parts[1] };
  }

  logout(): void {
    this.axios.defaults.headers.common.Authorization = '';
    delete this.axios.defaults.headers.common['Environment-Hash-Id'];
    this.loggedIn = false;
  }

  static getCancelToken(): CancelTokenSource {
    return Axios.CancelToken.source();
  }

  async request(
    method: Method,
    path: string,
    params?: AxiosRequestConfig['params'],
    data?: AxiosRequestConfig['data'],
    cancelToken?: CancelTokenSource,
  ): Promise<any> {
    let response;
    const config: AxiosRequestConfig = {
      method,
      url: path,
      params,
      data,
    };
    if (cancelToken !== undefined) {
      config.cancelToken = cancelToken.token;
    }
    try {
      response = await this.axios.request(config);
    } catch (e) {
      if (e instanceof BaseError) {
        // is a wtg error already, eg. from axios interceptors
        throw e;
      }
      if (Axios.isCancel(e)) {
        throw new CommsCanceledError();
      }
      if (Axios.isAxiosError(e)) {
        if (e.response !== undefined) {
          const responseData = e.response.data;
          let rawKey: unknown;
          let rawMessage: unknown;
          if (typeof responseData === 'object' && responseData !== null) {
            rawKey = (responseData as Record<string, unknown>)?.key;
            rawMessage = (responseData as Record<string, unknown>)?.message;
          }
          const key = typeof rawKey === 'string' ? rawKey : 'unknown';
          const message = typeof rawMessage === 'string' ? rawMessage : 'unknown';
          if (e.response.status === 401) {
            throw new AuthenticationError(key, message);
          }
          if (e.response.status === 403 && key === 'outdated_client_error') {
            throw new OutdatedClientError();
          }
          if (e.response.status === 402) {
            throw new BillingError(key, message);
          }

          throw new CommsResponseError(
            e.response.data,
            e.response.status,
            e.response.headers,
            method,
            path,
            params,
            data,
          );
        }
        const axiosNetworkErrorCodes = [
          AxiosError.ERR_NETWORK,
          AxiosError.ETIMEDOUT,
          AxiosError.ECONNABORTED,
        ];
        const { code, request } = e;
        if (code !== undefined
          && request !== undefined
          && axiosNetworkErrorCodes.includes(code)) {
          throw new CommsRequestError(
            method,
            path,
            params,
            data,
          );
        }
      }
      throw new CommsError(e.message);
    }

    return response.data;
  }
}

export default Comms;
