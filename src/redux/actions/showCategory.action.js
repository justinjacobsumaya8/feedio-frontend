import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import { setCategory, setIsLoading } from "../slices/showCategory.slice";
import Category from "src/models/Category";

export const getCategory = (id) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get(`api/categories/${id}`);

            dispatch(setCategory(Category.format(response.data.data)));
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