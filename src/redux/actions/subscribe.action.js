import axiosService from "src/services/AxiosService";
import { setAlert } from "../slices/alert.slice";
import { resetTitle, setIsLoadingFollow, setIsLoadingUnfollow } from "../slices/subscribe.slice";

const SOURCE_SUBSCRIPTION_TYPE = "source";
const CATEGORY_SUBSCRIPTION_TYPE = "category";
const AUTHOR_SUBSCRIPTION_TYPE = "author";

export const createSubscription = (action, subscriptionType, userFolderId = null) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoadingFollow(true));
        const { activeArticle } = getState().exploreArticles;
        const { newFolderTitle } = getState().subscribe;
        const { category } = getState().showCategory;
        const { author } = getState().showAuthor;

        let params = {
            action: action,
            subscription_type: subscriptionType,
        };

        if (action === "existing_folder" && userFolderId) {
            params.user_folder_id = userFolderId;
        }

        if (action === "new_folder") {
            params.title = newFolderTitle;
        }

        if (subscriptionType === SOURCE_SUBSCRIPTION_TYPE) {
            params.source_id = activeArticle.sourceId;
        }

        if (subscriptionType === CATEGORY_SUBSCRIPTION_TYPE) {
            params.category_id = category.id;
        }

        if (subscriptionType === AUTHOR_SUBSCRIPTION_TYPE) {
            params.author_id = author.id;
        }

        try {
            const response = await axiosService.post("api/user-folders/subscribe", params);

            dispatch(setAlert({
                message: "Successfully subscribed",
                type: "success"
            }));
            dispatch(setIsLoadingFollow(false));
            dispatch(resetTitle());
            return Promise.resolve(response);
        } catch (error) {
            dispatch(setAlert({
                message: error.message,
                type: "error"
            }));
            dispatch(setIsLoadingFollow(false));
            return Promise.reject(error);
        }
    };
};

export const unfollowSubscription = (subscriptionType, userFolderSubscriptionId) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoadingUnfollow(true));

        let params = {
            subscription_type: subscriptionType
        };

        try {
            const response = await axiosService.post(`api/user-folders/unsubscribe/${userFolderSubscriptionId}`, params);

            dispatch(setIsLoadingUnfollow(false));
            return Promise.resolve(response);
        } catch (error) {
            dispatch(setAlert({
                message: error.message,
                type: "error"
            }));
            dispatch(setIsLoadingUnfollow(false));
            return Promise.reject(error);
        }
    };
};