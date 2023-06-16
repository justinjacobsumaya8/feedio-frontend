import axiosService from "src/services/AxiosService";
import { setIsLoading, reset } from "../slices/forgotPassword.slice";
import { setAlert } from "../slices/alert.slice";

export const sendResetEmail = () => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        const { email } = getState().forgotPassword;

        try {
            const response = await axiosService.post("api/password/email", { email });
            dispatch(setAlert({
                message: response.data.message,
                type: "success"
            }));
            dispatch(reset());
            dispatch(setIsLoading(false));
            return Promise.resolve(response);
        } catch (error) {
            dispatch(setAlert({
                message: error.message,
                type: "error"
            }));
            dispatch(setIsLoading(false));
            return Promise.reject(error);
        }
    };
};

export const submitReset = (token) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        const {
            email,
            password,
            confirmPassword
        } = getState().forgotPassword;

        let params = {};
        params.token = token;
        params.email = email;
        params.password = password;
        params.password_confirmation = confirmPassword;

        try {
            const response = await axiosService.post("api/password/reset", { ...params });
            dispatch(reset());
            dispatch(setAlert({
                message: response.data.message,
                type: "success"
            }));
            dispatch(setIsLoading(false));
            return Promise.resolve(response);
        } catch (error) {
            dispatch(setAlert({
                message: error.message,
                type: "error"
            }));
            dispatch(setIsLoading(false));
            return Promise.reject(error);
        }
    };
};