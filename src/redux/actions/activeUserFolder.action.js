import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import { setIsLoading, setUserFolder } from "../slices/activeUserFolder.slice";
import UserFolder from "src/models/UserFolder";

export const getActiveUserFolder = (id) => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get(`api/user-folders/${id}`);
            const data = UserFolder.format(response.data.data);

            dispatch(setUserFolder(data));
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

export const submitNewTitle = (id, newTitle) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        const params = {
            title: newTitle
        };

        try {
            const response = await axiosService.post(`api/user-folders/${id}`, params);
            dispatch(setAlert({
                message: "Title updated succesfully",
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

export const deleteFolder = (id) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.delete(`api/user-folders/${id}`);
            dispatch(setAlert({
                message: "Folder deleted succesfully",
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