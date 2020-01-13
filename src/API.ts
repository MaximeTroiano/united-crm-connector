import "regenerator-runtime/runtime";
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import colors from "./const/colors";
import { ApiPosition } from "./interfaces/ApiPosition";

class API {
    // * VARIABLES *
    /** @description This variable contains the token of the user */
    public token!: string;

    /** @description 0 = none, 1 = normal, 2 = detailed, 3 = detailed + results */
    public debug_level: number = 1;

    /** @description Extra indent for logs */
    public logs_indent: number = 0;

    /** @description This variable will containe the start time of any request */
    private start!: number;

    /** @description This variable will containe the end time of any request */
    private end!: number;

    /** @description The variable that will contain the AXIOS instance */
    private instance: AxiosInstance;

    /** @description The URL to the CRM backend */
    private api_url?: string;

    /** @description The timeout time to the API */
    public api_timeout: number = 3000;

    // * CONSTRUCTOR *
    constructor(api_url: string) {
        if (!api_url) throw new Error("No API url has been set");
        this.api_url = api_url;
        this.instance = this.init();
    }

    // * PRIVATE METHODS *
    /**
     * @description Init the Axios instance with the URL and headers
     * @returns An axios instance
     */
    private init = () => {
        if (this.debug_level >= 2) this.log.message(1, "Axios has been intitialized");

        return axios.create({
            baseURL: this.api_url,
            timeout: this.api_timeout
        });
    };

    public onError!: Function;
    private handleResponse = (response: AxiosResponse<any>) => {
        if (this.debug_level >= 2) this.log.message(1, "Response is being handled");
        // Get the result data of the request
        let data = response.data;

        // If no success, redirect to the error function
        if (!data.success) return this.handleError(response);

        if (this.debug_level >= 2) this.log.success(1);
        if (this.debug_level == 3) this.log.result(1, data.data);

        // Return the resulting data;
        return data;
    };

    private handleError = (response: AxiosResponse<any>) => {
        if (!response.data) {
            this.log.error(1, `The endpoint didn't respond after ${this.api_timeout}ms`);
            return {
                name: "SERVER_DOWN",
                message: "The server is currently unavailable"
            };
        }

        if (this.debug_level >= 2) this.log.message(1, "Response was of type error");
        // Get the result data of the request
        let data = response.data;

        // Log the error
        this.log.error(1, data.error.name, data.error.message);

        if (this.onError) this.onError(data.error);

        // Return the error
        return data.error;
    };

    /**
     * @description Custom logging function
     */
    private log = {
        error: (i: number = 0, ...m: Array<string | number>) => {
            if (this.debug_level == 0) return;

            this.end = new Date().getTime();
            console.log(
                this.log.createIndent(i),
                `${colors.fgred}[ERROR in ${this.end - this.start}ms]`,
                m.join(" "),
                colors.reset
            );
        },

        success: (i: number = 0, ...m: Array<string | number>) => {
            if (this.debug_level == 0) return;
            this.end = new Date().getTime();
            console.log(
                this.log.createIndent(i),
                `${colors.fggreen}[SUCCESS in ${this.end - this.start}ms]`,
                m.join(" "),
                colors.reset
            );
        },

        request: (i: number = 0, ...m: Array<string | number>) => {
            if (this.debug_level == 0) return;
            this.start = new Date().getTime();
            console.log(
                this.log.createIndent(i),
                `${colors.fgblue}[API REQUEST]`,
                m.join(" "),
                colors.reset
            );
        },

        result: (i: number = 0, ...m: Array<string | number>) => {
            if (this.debug_level == 0) return;
            console.log(
                this.log.createIndent(i),
                `${colors.fgyellow}[RESULT]`,
                m.map(mm => JSON.stringify(mm)).join(" "),
                colors.reset
            );
        },

        message: (i: number = 0, ...m: Array<string | number>) => {
            if (this.debug_level == 0) return;
            console.log(
                this.log.createIndent(i),
                `${colors.fgcyan}[MESSAGE]`,
                m.join(" "),
                colors.reset
            );
        },

        createIndent: (n: number) => {
            let indent = "";
            for (let i = 0; i < n + this.logs_indent; i++) {
                indent += "    ";
            }
            return indent;
        }
    };

    private authHeader = (extraHeaders?: any, extraOptions: any = {}) => {
        if (this.debug_level >= 2) this.log.message(1, "Generate auth header");
        return {
            ...extraOptions,
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...extraHeaders
            }
        };
    };

    // * PUBLIC METHODS *

    /**
     * todo Implement impersonation in backend
     * @description Impersonate a user
     * @returns OK or NOK
     */
    public impersonate = (userId: number) => {
        this.log.request(0, "Impersonate", userId);
        this.log.error(1, "Impersonation has not been implemented yet");
    };

    /**
     * @description Logs a given user in
     * @returns The authentification token
     */
    public login = async (username: string, password: string) => {
        this.log.request(0, "Login", username);
        return this.instance
            .post("/auth/login", { username, password })
            .then(this.handleResponse)
            .then(token => {
                if (this.debug_level == 3) this.log.result(1, "Token length", token.data.length);
                this.token = token.data.token;
                return token;
            })
            .catch(this.handleError);
    };

    /**
     * @description Get the list of any entity
     * @returns The requested data
     */
    public find = async (
        entity: string,
        where: object = {},
        position: ApiPosition = { take: 50, skip: 0 },
        order: string = ""
    ) => {
        this.log.request(0, "Find", entity, position.skip || 0, position.take || 50);
        return this.instance
            .get(
                `/data/${entity}?where=${JSON.stringify(where)}&skip=${position.skip}&take=${
                    position.take
                }&order=${order}`,
                this.authHeader()
            )
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get the list of values for a list
     * @returns The requested data
     */
    public getListValues = async (listName: string) => {
        this.log.request(0, "List of values", listName);
        return this.instance
            .get(`/lists/${listName}`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get the lists of values
     * @returns The requested data
     */
    public getLists = async () => {
        this.log.request(0, "Lists of values");
        return this.instance
            .get(`/lists`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get the list of values for a list
     * @returns The requested data
     */
    public saveListValue = async (listName: string, data: object) => {
        this.log.request(0, "List of values", listName);
        return this.instance
            .post(`/lists/${listName}`, data, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    /**
     * @description Get the list of any entity with a search criteria
     * @returns The requested data
     */
    public search = async (
        entity: string,
        search: string,
        position: ApiPosition = { take: 50, skip: 0 },
        order: string = ""
    ) => {
        this.log.request(0, "Search", entity, search, position.skip || 0, position.take || 50);
        return this.instance
            .get(
                `/data/${entity}?search=${search}&skip=${position.skip}&take=${position.take}&order=${order}`,
                this.authHeader()
            )
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    public findOne = async (entity: string, where: object) => {
        this.log.request(0, "Find one", entity);
        return this.instance
            .get(`/data/${entity}/one?where=${JSON.stringify(where)}`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    public findById = async (entity: string, id: number) => {
        this.log.request(0, "Find by id", entity, id);
        return this.instance
            .get(`/data/${entity}/${id}`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get related elements of record
     * @returns The requested data
     */
    public findRelated = async (
        entity: string,
        id: number,
        relation: string,
        where: object = {},
        order: string = ""
    ) => {
        this.log.request(0, "Find related of id", entity, id);
        return this.instance
            .get(`/data/${entity}/${id}/${relation}?order=${order}`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Save an element to the database
     * @returns The resulting data
     */
    public save = async (entity: string, data: object) => {
        if (this.onSave) this.onSave(entity, data);

        this.log.request(0, "Save", entity);
        return this.instance
            .post(`/data/${entity}`, data, this.authHeader())
            .then(result => {
                if (this.afterSave) this.afterSave(entity, data, result);
                return result;
            })
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    public onSave!: Function;
    public afterSave!: Function;

    /**
     * @description Save a relation to the database
     * @returns The resulting data
     */
    public saveRelated = async (
        entity: string,
        entityId: number,
        relation: string,
        relationId: number,
        data: object = {}
    ) => {
        if (this.onSaveRelated) this.onSaveRelated(entity, entityId, relation, relationId, data);

        this.log.request(0, "Save related", entity, entityId, relation, relationId);
        return this.instance
            .post(`/data/${entity}/${entityId}/${relation}/${relationId}`, data, this.authHeader())
            .then(result => {
                if (this.afterSaveRelated)
                    this.afterSaveRelated(entity, entityId, relation, relationId, data, result);
                return result;
            })
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    public onSaveRelated!: Function;
    public afterSaveRelated!: Function;

    /**
     * @description Save a relation to the database
     * @returns The resulting data
     */
    public removeRelated = async (
        entity: string,
        entityId: number,
        relation: string,
        relationId: number
    ) => {
        this.log.request(0, "Delete related", entity, entityId, relation, relationId);

        if (this.onRemoveRelated)
            if (!(await this.onRemoveRelated(entity, entityId, relation, relationId)))
                return this.log.error(1, "Canceled");

        return this.instance
            .delete(`/data/${entity}/${entityId}/${relation}/${relationId}`, this.authHeader())
            .then(result => {
                if (this.afterRemoveRelated)
                    this.afterRemoveRelated(entity, entityId, relation, relationId, result);
                return result;
            })
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    public onRemoveRelated!: Function;
    public afterRemoveRelated!: Function;

    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    public remove = async (entity: string, id: number) => {
        this.log.request(0, "Remove", entity, id);

        if (this.onRemove)
            if (!(await this.onRemove(entity, id))) return this.log.error(1, "Canceled");

        return this.instance
            .delete(`/data/${entity}/${id}`, this.authHeader())
            .then(result => {
                if (this.afterDelete) this.afterDelete(entity, id, result);
                return result;
            })
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    public onRemove!: Function;
    public afterDelete!: Function;

    /**
     * @description Removes an element from the database
     * @returns The resulting data
     */
    public config = async (entity: string | null = null) => {
        this.log.request(0, "Config", entity || "global");

        const URL = !entity ? "/config" : `/config/${entity}`;
        return this.instance
            .get(URL, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Uploads a file to the server
     * @returns The resulting id etc
     */
    public uploadFile = async (fileData: any, chunkBlob: any, folderId?: number) => {
        this.log.request(0, "Upload", fileData.name);

        let data = new FormData();
        data.append("file", chunkBlob);

        return this.instance
            .post(
                `/files`,
                data,
                this.authHeader({
                    "x-file-name": fileData.name,
                    "x-file-type": fileData.type,
                    "x-folder-id": folderId || 0
                })
            )
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Downloads a file from the server
     * @returns The file :-)
     */
    public downloadFile = async (fileId: number) => {
        this.log.request(0, "Download", fileId);

        return this.instance
            .get(`/data/files/${fileId}/download`, this.authHeader({}, { responseType: "blob" }))
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Uploads a file to the server
     * @returns The resulting id etc
     */
    public calculateKpi = async (type: string, query: object) => {
        this.log.request(0, "Calculate KPI", type);
        return this.instance
            .post(`/kpi`, { type, query }, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };
}

export default API;
