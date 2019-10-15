import axios, { AxiosInstance } from 'axios'
import {
  isEmpty,
  merge,
  assign,
} from 'lodash'

import {
  AxiosInstanceConfigureType
} from './types'

const singletonEnforcer = Symbol()

class Axios {
  private axiosClient: AxiosInstance
  static axiosInstance: Axios

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance')
    }

    this.axiosClient = axios.create()
  }

  static get instance() {
    if (!this.axiosInstance) {
      this.axiosInstance = new Axios(singletonEnforcer)
    }

    return this.axiosInstance
  }

  setConfigure (configure: AxiosInstanceConfigureType) {
    const { baseURL, headers = {}, ...rest } = configure

    this.axiosClient.defaults.baseURL = baseURL
    this.axiosClient.defaults.headers = {
      ...merge(
        this.axiosClient.defaults.headers,
        headers
      )
    }
    this.axiosClient.defaults = {
      ...this.axiosClient.defaults,
      ...rest,
    }
  }

  setHeaderToken(userToken: string = '') {
    const jwt = /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/

    if (jwt.test(userToken)) {
      this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`
    }
  }

  get(resource: string, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`
    return this.axiosClient.get(requestURL, {
      data: null,
      ...merge({ headers: this.axiosClient.defaults.headers }, config)
    })
  }

  post(resource: string, data: object, config = {}) {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  update(resource: string, data: object, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  put(resource: string, data: object, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  patch(resource: string, data: object, config = {}) {
    return this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    )
  }

  delete(resource: string, data: object, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosClient.defaults.headers)
    })
  }
}

export default Axios.instance
