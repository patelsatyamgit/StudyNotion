import axios from "axios"

const axiosInstance = axios.create({});

export default axiosInstance;

export const  apiConnector = (method, url, bodyData, headers, params) => {
    return  axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}