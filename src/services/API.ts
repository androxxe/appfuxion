// import axios, { AxiosResponse } from "axios";
// import STORAGE_KEY from "@/helpers/storageKey";
// import * as SecureStore from "expo-secure-store";
// import { reset } from "@/helpers/navigation";
// import { sleep } from "@/helpers/utils";
// import { ToastAndroid } from "react-native";
// import errorParse from "@/helpers/errorParse";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const config = {
//   baseUrl: "http://103.193.177.182:3000/v1",
// };

// export const STATUS_CODE = {
//   OK: 200,
//   NOT_FOUND: 404,
//   NO_CONTENT: 204,
//   FORBIDDEN: 403,
// };

// let limitNavigation: boolean = true; //limiter navigation
// let isLoading: boolean = false;
// let queue: any[] = [];

// export const refreshToken = async () => {
//   if (isLoading) {
//     return Promise.resolve();
//   }

//   return await new Promise(async (resolve, reject) => {
//     try {
//       post("/auth/refresh-token")
//         .then(async (result) => {
//           console.log("REFRESH TOKEN SUCCESS");

//           await SecureStore.setItemAsync(STORAGE_KEY.TOKEN, result.data.token);
//           await SecureStore.setItemAsync(
//             STORAGE_KEY.TOKEN_EXPIRES_AT,
//             result.data.expires_at
//           );
//           console.log("STATE_LOADING_TOKEN FALSE");
//           isLoading = false;

//           resolve(true);
//         })
//         .catch(async (error) => {
//           console.error("REFRESH TOKEN ERROR", error.message);
//           isLoading = false;

//           reject(error);
//         });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const setAccessToken = () => {

// }

// const request = async (
//   url: string,
//   params: any,
//   customHeaders: any,
//   options: any,
//   cancelToken = null
// ) => {
//   const source = cancelToken || axios.CancelToken.source();

//   let refresh_token = false;
//   if (url.includes("refresh-token")) {
//     refresh_token = true;
//   }

//   let exclude_auth_token = false;
//   if (options) {
//     exclude_auth_token = options.exclude?.find((item: any) => item == "auth_token");
//   }

//   queue.push({ url, source });

//   while (isLoading) {
//     console.log("URL SLEEP", url);
//     await sleep(1000);
//   }

//   if (refresh_token) {
//     isLoading = true;
//   }

//   const timeout = setTimeout(() => {
//     source.cancel();
//   }, 15000);

//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "User-Agent": "LAPORMAS_MOBILE",
//     Authorization: `Bearer ${await SecureStore.getItemAsync(
//       STORAGE_KEY.TOKEN
//     )}`,
//     ...customHeaders,
//   };

//   if (exclude_auth_token) {
//     delete headers.Authorization;
//   }

//   const response: any | AxiosResponse = await axios({
//     timeout: 15000,
//     url,
//     ...params,
//     headers,
//     cancelToken: source.token,
//     // signal: controller ? controller.signal : null,
//   })
//     .then((result) => {
//       limitNavigation = false;
//       queue = queue.filter((item) => item.url == url);

//       // for DELETE method case
//       if (result.status === STATUS_CODE.NO_CONTENT) {
//         clearTimeout(timeout);
//         return {};
//       }

//       clearTimeout(timeout);
//       return Promise.resolve(result.data);
//     })
//     .catch(async (result) => {
//       let response = Object.values(result)[0];

//       clearTimeout(timeout);
//       if (response == "canceled") {
//         return Promise.reject({
//           message: "Tidak ada koneksi",
//           status: "error",
//         });
//       }

//       // Server Down
//       if (result.response.status == 502 || result.response.status == 503) {
//         if (!limitNavigation) {
//           limitNavigation = true;
//           reset("maintenance");
//         }
//         return Promise.reject({
//           message: "Maintenance",
//           status: "error",
//         });
//       }

//       console.log("FAILED URL", url);
//       // Token Invalid
//       if (
//         result.response?.data?.message === "TOKEN_INVALID" ||
//         result.response?.data?.message === "AUTHORIZATION_REQUIRED"
//       ) {
//         if (refresh_token) {
//           console.log(
//             "NETWORKING REFRESH TOKEN TRUE GO LOGOUT",
//             result.response.data.message,
//             refresh_token
//           );

//           // DELETE QUEUE
//           queue.map((item) => item.source?.cancel());

//           if (!limitNavigation) {
//             await AsyncStorage.clear();
//             limitNavigation = true;
//             reset("login");
//           }
//         } else {
//           try {
//             console.log("CALL REFRESH TOKEN FROM NETWORK");
//             await refreshToken();
//             return await request(
//               url,
//               params,
//               customHeaders,
//               options,
//               cancelToken
//             );
//           } catch (e) {
//             console.log("NETWORKING_CATCH_REFRESH_TOKEN", { url });

//             // DELETE QUEUE
//             queue.map((item) => item.source?.cancel());

//             if (!limitNavigation) {
//               await AsyncStorage.clear();
//               limitNavigation = true;
//               reset("login");
//             }
//           }
//         }

//         return Promise.reject({
//           status: "error",
//           message: errorParse(result.response),
//         });
//       }

//       // Forbidden
//       if (result.response?.data?.message === "FORBIDDEN_ACCESS") {
//         ToastAndroid.show("Tidak bisa di akses", ToastAndroid.SHORT);
//         console.log({
//           url,
//         });
//         if (!limitNavigation) {
//           post("/auth/logout", {}, {}, {});

//           await AsyncStorage.clear();
//           limitNavigation = true;
//           reset("login");
//         }

//         return Promise.reject({
//           message: "FORBIDDEN_ACCESS",
//           status: "error",
//         });
//       }

//       const errMessage = result?.message?.split(" ");
//       if (axios.isCancel(result)) {
//         return Promise.reject({
//           message: "timeout",
//           status: "timeout",
//         });
//       }
//       if (result.toJSON().message === "Network Error") {
//         return Promise.reject({
//           message: "timeout",
//           status: "timeout",
//         });
//       }
//       if (errMessage[0] === "timeout") {
//         return Promise.reject({
//           message: "timeout",
//           status: "timeout",
//         });
//       }

//       return Promise.reject(result.response.data);
//       // });
//     });

//   return response;
// };

// const get = async (
//   endpoint: string,
//   params = {},
//   headers = {},
//   options = {},
//   cancelToken = null
// ): Promise<any> => {
//   let url = `${config.baseUrl}${endpoint}`;

//   const fetchParams = {
//     method: "GET",
//     params,
//   };

//   return request(url, fetchParams, headers, options, cancelToken);
// };

// const post = async (
//   endpoint: string,
//   params = {},
//   headers = {},
//   options: any = {}
// ) => {
//   let url;
//   let fetchParams;
//   url = `${config.baseUrl}${endpoint}`;
//   fetchParams = {
//     method: "POST",
//     data: params,
//   };
//   return request(url, fetchParams, headers, null, options);
// };

// const patch = async (
//   endpoint: string,
//   params = {},
//   headers = {},
//   options: any = {}
// ) => {
//   const url = `${config.baseUrl}${endpoint}`;
//   const fetchParams = {
//     method: "PATCH",
//     data: params,
//   };
//   return request(url, fetchParams, headers, null, options);
// };

// const put = async (
//   endpoint: string,
//   params = {},
//   headers = {},
//   options: any = {}
// ) => {
//   let url = `${config.baseUrl}${endpoint}`;
//   let fetchParams = {
//     method: "PUT",
//     data: params,
//   };
//   return request(url, fetchParams, headers, null, options);
// };

// const remove = async (
//   endpoint: string,
//   params = {},
//   headers = {},
//   options: any = {}
// ) => {
//   const url = `${config.baseUrl}${endpoint}`;
//   const fetchParams = {
//     method: "DELETE",
//     data: params,
//   };
//   return request(url, fetchParams, headers, null, options);
// };

// export { get, post, put, patch, remove };

const API_URL: string = process.env.API_URL || "http://103.193.177.182:3000/v1";

class ApiError extends Error {
    statusCode: number;
    messages: Array<string> | string;

    constructor(res: any) {
        super(res.error);

        this.messages = res.message;
        this.statusCode = res.statusCode;
    }
}

class Api {
    private token: string;
    private refreshToken: string;

    constructor() {
        this.token = "";
        this.refreshToken = "";
    }

    setToken(token: string) {
        this.token = token;
    }

    resetToken() {
        this.token = "";
    }

    getToken() {
        return this.token;
    }

    async request(path: string, options: RequestInit = {}): Promise<any> {
        const requestOptions: RequestInit = {
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.getToken()}`,
                "User-Agent": "LAPORMAS_MOBILE",
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(`${path}`, requestOptions);
        // const response = await fetch(`${API_URL}${path}`, requestOptions);
        const res = await response.json();

        // console.log(res, 'server')
        if (!response.ok) {
            if (res.message === "Unauthorized") {
                // try refresh Token
                // try {
                //   await refreshAPI({ refreshToken: this.refreshToken })
                // } catch (error) {}
            }
            throw new ApiError(res);
        }

        return res;
    }

    get(path: string): Promise<any> {
        return this.request(path);
    }

    put(path: string, body: any): Promise<any> {
        return this.request(path, { method: "PUT", body: JSON.stringify(body) });
    }

    remove(path: string, body: any = {}): Promise<any> {
        return this.request(path, { method: "DELETE", body: JSON.stringify(body) });
    }

    post(path: string, body: any = {}): Promise<any> {
        return this.request(path, { method: "POST", body: JSON.stringify(body) });
    }

    patch(path: string, body: any): Promise<any> {
        return this.request(path, { method: "PATCH", body: JSON.stringify(body) });
    }
}

const API = new Api();
export default API;
