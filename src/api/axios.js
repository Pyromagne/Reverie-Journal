import axios from "axios";

let BASE_URL;
if (process.env.REACT_APP_DEPLOYMENT_TYPE === 'local') {
    BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
} else if (process.env.REACT_APP_DEPLOYMENT_TYPE === 'live') {
    BASE_URL = process.env.REACT_APP_BASE_URL_LIVE;
}

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});