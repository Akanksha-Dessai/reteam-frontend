import axios from "axios";


export const axiosSecureInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL,timeout: 3600000, });
// export const axiosNonSecureInstance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
