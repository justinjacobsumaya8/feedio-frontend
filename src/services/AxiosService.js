import axios from "axios";
import APP from "src/config/app";
import CustomError from "src/models/CustomError";
import Cookies from "universal-cookie";

const instance = axios.create({
    baseURL: APP.API_URL
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.interceptors.request.use(function (config) {
    const cookies = new Cookies();
    const token = cookies.get(APP.ACCESS_TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

instance.interceptors.response.use((response) => response, (error) => {
    return Promise.reject(CustomError.format(error));
});

export default instance;