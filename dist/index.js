"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const lodash_1 = require("lodash");
const singletonEnforcer = Symbol();
class Axios {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot initialize Axios client single instance');
        }
        this.axiosClient = axios_1.default.create();
    }
    static get instance() {
        if (!this.axiosInstance) {
            this.axiosInstance = new Axios(singletonEnforcer);
        }
        return this.axiosInstance;
    }
    setConfigure(configure) {
        const { baseURL, headers = {} } = configure, rest = tslib_1.__rest(configure, ["baseURL", "headers"]);
        this.axiosClient.defaults.baseURL = baseURL;
        this.axiosClient.defaults.headers = Object.assign({}, lodash_1.merge(this.axiosClient.defaults.headers, headers));
        this.axiosClient.defaults = Object.assign(Object.assign({}, this.axiosClient.defaults), rest);
    }
    setHeaderToken(userToken = '') {
        const jwt = /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/;
        if (jwt.test(userToken)) {
            this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
        }
    }
    get(resource, slug = '', config = {}) {
        const requestURL = lodash_1.isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
        return this.axiosClient.get(requestURL, Object.assign({ data: null }, lodash_1.merge({ headers: this.axiosClient.defaults.headers }, config)));
    }
    post(resource, data, config = {}) {
        return this.axiosClient.post(`${resource}`, data, lodash_1.assign(config, this.axiosClient.defaults.headers));
    }
    update(resource, data, config = {}) {
        return this.axiosClient.put(`${resource}`, data, lodash_1.assign(config, this.axiosClient.defaults.headers));
    }
    put(resource, data, config = {}) {
        return this.axiosClient.put(`${resource}`, data, lodash_1.assign(config, this.axiosClient.defaults.headers));
    }
    patch(resource, data, config = {}) {
        return this.axiosClient.patch(`${resource}`, data, lodash_1.assign(config, this.axiosClient.defaults.headers));
    }
    delete(resource, data, config = {}) {
        return this.axiosClient.delete(`${resource}`, Object.assign({ params: data }, lodash_1.assign(config, this.axiosClient.defaults.headers)));
    }
}
exports.default = Axios.instance;
//# sourceMappingURL=index.js.map