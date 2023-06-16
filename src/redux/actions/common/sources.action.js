import axiosService from "src/services/AxiosService";
import { setAlert } from "src/redux/slices/alert.slice";
import Source from "src/models/Source";
import { setIsLoading, setSources } from "src/redux/slices/common/sources.slice";

export const getSources = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get("api/sources");
            const data = response.data.data.map((datum) => Source.format(datum));

            dispatch(setSources(data));
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