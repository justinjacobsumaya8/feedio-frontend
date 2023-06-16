import APP from "src/config/app";
import { setAlert } from "../slices/alert.slice";
import Cookies from "universal-cookie";
import IssuedToken from "src/models/IssuedToken";
import axiosService from "src/services/AxiosService";
import {
    saveLogout,
    setAuthenticatedUser,
    setIsLoggingIn,
    setIsLoggingOut
} from "../slices/authentication.slice";

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(setIsLoggingIn(true));

        try {
            const response = await axiosService.post(`/api/oauth/token`, {
                username: email,
                password: password,
                grant_type: "password",
                client_id: APP.BACKEND_API_CLIENT_ID,
                client_secret: APP.BACKEND_API_CLIENT_SECRET,
                scope: "*"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = IssuedToken.format(response.data);

            const cookies = new Cookies();
            cookies.set(APP.ACCESS_TOKEN_KEY, data.accessToken, { path: '/', maxAge: data.expiresIn, sameSite: "lax", secure: true });
            cookies.set(APP.REFRESH_TOKEN_KEY, data.refreshToken, { path: '/', maxAge: data.expiresIn * 2, sameSite: "lax", secure: true });

            dispatch(setAuthenticatedUser(data.user));
            dispatch(setIsLoggingIn(false));
            return Promise.resolve(response);
        } catch (error) {
            dispatch(setIsLoggingIn(false));
            dispatch(setAlert({
                message: error.message,
                type: "error"
            }));
            return Promise.reject(error);
        }
    };
};

export const logout = () => {
    return async (dispatch, getState) => {
        dispatch(setIsLoggingOut(true));

        const cookies = new Cookies();
        try {
            await axiosService.post("/api/auth/logout");

            cookies.remove(APP.ACCESS_TOKEN_KEY, { path: '/' });
            cookies.remove(APP.REFRESH_TOKEN_KEY, { path: '/' });

            dispatch(saveLogout());
            dispatch(setIsLoggingOut(false));

            return Promise.resolve("");
        } catch (error) {
            dispatch(setIsLoggingOut(false));
            return Promise.reject("");
        }
    };
};