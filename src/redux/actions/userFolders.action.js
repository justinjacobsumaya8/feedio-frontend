import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import { setIsLoading, setUserFolders } from "../slices/userFolders.slice";
import UserFolder from "src/models/UserFolder";
import User from "src/models/User";
import { setAuthenticatedUser } from "../slices/authentication.slice";

export const getUserFolders = () => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));

        try {
            const response = await axiosService.get("api/user-folders");
            const data = response.data.data.map((datum) => UserFolder.format(datum));
            const authenticatedUser = User.format(response.data.user);

            dispatch(setUserFolders(data));
            dispatch(setAuthenticatedUser(authenticatedUser));
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