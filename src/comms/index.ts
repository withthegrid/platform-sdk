import qs from 'qs';

import Axios, {
  AxiosInstance,
  CancelTokenSource,
  AxiosRequestConfig,
  Method,
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
      paramsSerializer: (params) => qs.stringify(params, { strictNullHandling: true }),
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
    if (this.axios.defaults.headers.common['Environment-Hash-Id'] === undefined) {
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
      if (e.response !== undefined) {
        if (e.response.status === 401) {
          throw new AuthenticationError(e.response.data.key, e.response.data.message);
        }
        if (e.response.status === 403 && e.response.data.key === 'outdated_client_error') {
          throw new OutdatedClientError();
        }
        if (e.response.status === 402) {
          throw new BillingError(e.response.data.key, e.response.data.message);
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
      if (e.request !== undefined) {
        throw new CommsRequestError(
          method,
          path,
          params,
          data,
        );
      }
      throw new CommsError(e.message);
    }

    return response.data;
  }
}

export default Comms;
