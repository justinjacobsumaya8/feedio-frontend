import { setAlert } from "../slices/alert.slice";
import { resetPassword, setIsLoading } from "../slices/registration.slice";
import axiosService from "src/services/AxiosService";

export const register = () => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));
        try {
            const {
                fullName, //
                email,
                password,
                confirmPassword,
                hasAgreedToTerms
            } = getState().registration;

            const data = {
                full_name: fullName,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            };

            if (hasAgreedToTerms) data.terms_and_conditions = hasAgreedToTerms;

            const response = await axiosService.post(`api/register`, data);

            dispatch(setAlert({
                message: "You've successfully created an account",
                type: "success"
            }));

            dispatch(setIsLoading(false));

            return Promise.resolve(response);
        } catch (error) {
            dispatch(setIsLoading(false));
            dispatch(resetPassword())
            dispatch(setAlert({
                message: error.message,
                type: "error"
            }));
            return Promise.reject(error);
        }
    };
};