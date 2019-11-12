import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import colors from "./const/colors";
import { ApiPosition } from "./interfaces/ApiPosition";

class API {
    // * VARIABLES *

    /** @description This variable will containe the start time of any request */
    start!: number;
    /** @description This variable will containe the end time of any request */
    end!: number;

    /** @description This variable contains the token of the user */
    token!: string;

    /** @description The variable that will contain the AXIOS instance */
    instance: AxiosInstance;

    /** @description The URL to the CRM backend */
    api_url: string = "http://localhost:4000";

    /** @description The timeout time to the API */
    api_timeout: number = 1000;

    // * CONSTRUCTOR *
    constructor() {
        this.instance = this.init();
    }

    // * PRIVATE METHODS *
    /**
     * @description Init the Axios instance with the URL and headers
     * @returns An axios instance
     */
    private init = () => {
        return axios.create({
            baseURL: this.api_url,
            timeout: this.api_timeout
        });
    };

    private handleResponse = (response: AxiosResponse<any>) => {
        // Get the result data of the request
        let data = response.data;

        // If no success, redirect to the error function
        if (!data.success) return this.handleError(response);

        this.log.success();

        // Return the resulting data;
        return data.data;
    };

    private handleError = (response: AxiosResponse<any>) => {
        // Get the result data of the request
        let data = response.data;

        // Log the error
        this.log.error(data.error.name, data.error.message);

        // Return the error
        return data.error;
    };

    /**
     * @description Custom logging function
     */
    private log = {
        error: (...m: Array<any>) => {
            this.end = new Date().getTime();
            console.error(
                `    ${colors.fgred}[ERROR in ${this.end - this.start}ms]`,
                m.join(" "),
                colors.reset
            );
        },

        success: (...m: Array<any>) => {
            this.end = new Date().getTime();
            console.error(
                `    ${colors.fggreen}[SUCCESS in ${this.end - this.start}ms]`,
                m.join(" "),
                colors.reset
            );
        },

        request: (...m: Array<any>) => {
            this.start = new Date().getTime();
            console.error(`${colors.fgblue}[API REQUEST]`, m.join(" "), colors.reset);
        },

        result: (...m: Array<any>) => {
            console.error(`    ${colors.fgyellow}[RESULT]`, m.join(" "), colors.reset);
        }
    };

    private authHeader = () => {
        return {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        };
    };

    // * PUBLIC METHODS *

    /**
     * @description Logs a given user in
     * @returns The authentification token
     */
    public login = async (username: string, password: string) => {
        this.log.request("Login", username);
        return this.instance
            .post("/auth/login", { username, password })
            .then(this.handleResponse)
            .then(token => {
                this.log.result("Token length", token.length);
                this.token = token;
            })
            .catch(this.handleError);
    };

    /**
     * @description Get the list of any entity
     * @returns The requested data
     */
    public find = async (entity: string, where: object = {}, position: ApiPosition = {}) => {
        this.log.request("Find", entity, position.skip, position.take);
        return this.instance
            .get(
                `/data/${entity}?where=${JSON.stringify(where)}&skip=${position.skip}&take=${
                    position.take
                }`,
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
        this.log.request("Find one", entity);
        return this.instance
            .get(`/data/${entity}?where=${JSON.stringify(where)}`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };

    /**
     * @description Get one element of an entity
     * @returns The requested data
     */
    public findById = async (entity: string, id: number) => {
        this.log.request("Find by id", entity, id);
        return this.instance
            .get(`/data/${entity}/${id}`, this.authHeader())
            .then(this.handleResponse)
            .catch(this.handleError);
    };
}

export default API;
