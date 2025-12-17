import axios from "axios";
const DEPLOYMENT_TYPE = import.meta.env.VITE_DEPLOYMENT_TYPE;
const BASE_URL_LOCAL = import.meta.env.VITE_BASE_URL_LOCAL;
const BASE_URL_LIVE = import.meta.env.VITE_BASE_URL_LIVE;

let BASE_URL;
if (DEPLOYMENT_TYPE === 'local') {
    BASE_URL = BASE_URL_LOCAL;
} else if (process.env.REACT_APP_DEPLOYMENT_TYPE === 'live') {
    BASE_URL = BASE_URL_LIVE;
}

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});