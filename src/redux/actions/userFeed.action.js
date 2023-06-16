import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import UserFeed from "src/models/UserFeed";
import { setIsLoading, setPagination, setShowFeedBy } from "../slices/userFeed.slice";
import Pagination from "src/models/Pagination";

export const getUserFeed = (showFeedByType = null) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        const { currentPage, showFeedBy } = getState().userFeed;

        // Only from first page load
        if (showFeedByType) {
            dispatch(setShowFeedBy(showFeedByType));
        }

        try {
            const params = {
                page: currentPage,
                show_feed_by: showFeedByType ? showFeedByType : showFeedBy,
            };

            const response = await axiosService.get("api/user-feed", { params });
            const pagination = Pagination.format(response.data);
            pagination.data = pagination.data.map((datum) => UserFeed.format(datum));

            dispatch(setPagination(pagination));
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