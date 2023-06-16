import axiosService from "src/services/AxiosService";
import { setAlert } from "src/redux/slices/alert.slice";
import Category from "src/models/Category";
import { setCategories, setIsLoading } from "src/redux/slices/common/categories.slice";

export const getCategories = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get("api/categories");
            const data = response.data.data.map((datum) => Category.format(datum));

            dispatch(setCategories(data));
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