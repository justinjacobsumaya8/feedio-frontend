import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import { setAuthor, setIsLoading } from "../slices/showAuthor.slice";
import Author from "src/models/Author";

export const getAuthor = (id) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get(`api/authors/${id}`);

            dispatch(setAuthor(Author.format(response.data.data)));
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