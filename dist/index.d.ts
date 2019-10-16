import { AxiosInstanceConfigureType } from './types';
declare class Axios {
    private axiosClient;
    static axiosInstance: Axios;
    constructor(enforcer: any);
    static readonly instance: Axios;
    setConfigure(configure: AxiosInstanceConfigureType): void;
    setHeaderToken(userToken?: string): void;
    get(resource: string, slug?: string, config?: {}): Promise<import("axios").AxiosResponse<any>>;
    post(resource: string, data: object, config?: {}): Promise<import("axios").AxiosResponse<any>>;
    update(resource: string, data: object, config?: {}): Promise<import("axios").AxiosResponse<any>>;
    put(resource: string, data: object, config?: {}): Promise<import("axios").AxiosResponse<any>>;
    patch(resource: string, data: object, config?: {}): Promise<import("axios").AxiosResponse<any>>;
    delete(resource: string, data: object, config?: {}): Promise<import("axios").AxiosResponse<any>>;
}
declare const _default: Axios;
export default _default;
