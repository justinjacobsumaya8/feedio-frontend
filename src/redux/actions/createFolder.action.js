import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import { reset, setIsLoading } from "../slices/createFolder.slice";

export const createFolder = () => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        const { title } = getState().createFolder;

        try {
            const response = await axiosService.post("api/user-folders", { title });

            dispatch(reset());
            dispatch(setAlert({
                message: "You've successfully created a folder",
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