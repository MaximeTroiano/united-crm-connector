import { ApiPosition } from "./interfaces/ApiPosition";
declare class API {
    /** @description This variable contains the token of the user */
    token: string;
    /** @description 0 = none, 1 = normal, 2 = detailed, 3 = detailed + results */
    debug_level: number;
    /** @description This variable will containe the start time of any request */
    private start;
    /** @description This variable will containe the end time of any request */
    private end;
    /** @description The variable that will contain the AXIOS instance */
    private instance;
    /** @description The URL to the CRM backend */
    private api_url?;
    /** @description The timeout time to the API */
    private api_timeout;
    constructor(api_url: string);
    /**
     * @description Init the Axios instance with the URL and headers
     * @returns An axios instance
     */
    private init;
    private handleResponse;
    private handleError;
    /**
     * @description Custom logging function
     */
    private log;
    private authHeader;
    /**
     * @description Logs a given user in
     * @returns The authentification token
     */
    login: (username: string, password: string) => Promise<any>;
    /**
     * @description Get the list of any entity
     * @returns The requested data
     */
    find: (entity: string, where?: object, position?: ApiPosition) => Promise<any>;
    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    findOne: (entity: string, where: object) => Promise<any>;
    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    findById: (entity: string, id: number) => Promise<any>;
    /**
     * @description Save an element to the database
     * @returns The resulting data
     */
    save: (entity: string, data: object) => Promise<any>;
    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    remove: (entity: string, id: number) => Promise<any>;
    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    config: (entity?: string | null) => Promise<any>;
}
export default API;
