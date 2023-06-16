import axiosService from "src/services/AxiosService";
import { setUserFolderSubscriptions, setIsLoading } from "../slices/allSubscriptions.slice";
import UserFolderSubscription from "src/models/UserFolderSubscription";
import { setAlert } from "../slices/alert.slice";

export const getAllUserFolderSubscriptions = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get(`api/user-folders/subscriptions/all`);
            const data = response.data.data.map(datum => UserFolderSubscription.format(datum));

            dispatch(setUserFolderSubscriptions(data));
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