import "regenerator-runtime/runtime";
declare class API {
    /** @description This variable contains the token of the user */
    token: string;
    /** @description 0 = none, 1 = normal, 2 = detailed, 3 = detailed + results */
    debug_level: number;
    /** @description Extra indent for logs */
    logs_indent: number;
    /** @description This variable will containe the start time of any request */
    private start;
    /** @description This variable will containe the end time of any request */
    private end;
    /** @description The variable that will contain the AXIOS instance */
    private instance;
    /** @description The URL to the CRM backend */
    private api_url?;
    /** @description The timeout time to the API */
    api_timeout: number;
    constructor(api_url: string, api_timeout?: number);
    /**
     * @description Init the Axios instance with the URL and headers
     * @returns An axios instance
     */
    private init;
    onError: Function;
    private handleResponse;
    private handleError;
    /**
     * @description Custom logging function
     */
    private log;
    private authHeader;
    /**
     * todo Implement impersonation in backend
     * @description Impersonate a user
     * @returns OK or NOK
     */
    impersonate: (userId: number) => void;
    /**
     * @description Logs a given user in
     * @returns The authentification token
     */
    login: (username: string, password: string) => Promise<any>;
    /**
     * @description Generate a reset password token => This is send by email
     * @returns The resulting data
     */
    resetPassword: (username: string) => Promise<any>;
    /**
     * @description Generate a reset password token => This is send by email
     * @returns The resulting data
     */
    setNewPassword: (token: string, password: string) => Promise<any>;
    /**
     * @description Get the list of any entity
     * @returns The requested data
     */
    find: (entity: string, options?: object) => Promise<any>;
    /**
     * @description Get the list of values for a list
     * @returns The requested data
     */
    getListValues: (listName: string) => Promise<any>;
    /**
     * @description Get the lists of values
     * @returns The requested data
     */
    getLists: () => Promise<any>;
    /**
     * @description Get the list of values for a list
     * @returns The requested data
     */
    saveListValue: (listName: string, data: object) => Promise<any>;
    /**
     * @description Get the list of values for a list
     * @returns The requested data
     */
    removeListValue: (listName: string, id: number) => Promise<any>;
    /**
     * @description Get the list of any entity with a search criteria
     * @returns The requested data
     */
    search: (entity: string, search: string, options?: object) => Promise<any>;
    /**
     * @description Get the list of any entity with a search criteria
     * @returns The requested data
     */
    changes: (entity: string, entityId: number, relation?: string | undefined, relationId?: number | undefined) => Promise<any>;
    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    findOne: (entity: string, options?: object) => Promise<any>;
    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    findById: (entity: string, id: number, options?: object) => Promise<any>;
    /**
     * @description Get related elements of record
     * @returns The requested data
     */
    findRelated: (entity: string, id: number, relation: string, options?: object) => Promise<any>;
    /**
     * @description Get related elements of record
     * @returns The requested data
     */
    findOneRelated: (entity: string, entityId: number, relation: string, relationId: number, options?: object) => Promise<any>;
    /**
     * @description Save an element to the database
     * @returns The resulting data
     */
    save: (entity: string, data: object) => Promise<any>;
    onSave: Function;
    afterSave: Function;
    /**
     * @description Save an element to the database
     * @returns The resulting data
     */
    silent_save: (entity: string, data: object) => Promise<any>;
    /**
     * @description Save a relation to the database
     * @returns The resulting data
     */
    saveRelated: (entity: string, entityId: number, relation: string, relationId: number, data?: object) => Promise<any>;
    onSaveRelated: Function;
    afterSaveRelated: Function;
    /**
     * @description Save a relation to the database
     * @returns The resulting data
     */
    removeRelated: (entity: string, entityId: number, relation: string, relationId: number) => Promise<any>;
    onRemoveRelated: Function;
    afterRemoveRelated: Function;
    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    remove: (entity: string, id: number) => Promise<any>;
    onRemove: Function;
    afterDelete: Function;
    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    config: (entity?: string | null) => Promise<any>;
    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    database: (func: string, parameters?: object) => Promise<any>;
    /**
     * @description Uploads a file to the server
     * @returns The resulting id etc
     */
    uploadFile: (fileData: any, file: any, folderId?: number | undefined) => Promise<any>;
    onUploadFile: Function;
    afterUploadFile: Function;
    /**
     * @description Downloads a file from the server
     * @returns The file :-)
     */
    downloadFile: (fileId: number) => Promise<any>;
    /**
     * @description Uploads a file to the server
     * @returns The resulting id etc
     */
    calculateKpi: (type: string, query: object) => Promise<any>;
    /**
     * @description Launches a custom function
     * @returns The resulting data
     */
    exec: (functionName: string, data: object) => Promise<any>;
    /**
     * @description Get the SAAS settings
     * @returns The requested data
     */
    getSaasSettings: () => Promise<any>;
}
export default API;
