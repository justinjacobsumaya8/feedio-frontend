import { setAlert } from "../slices/alert.slice";
import axiosService from "src/services/AxiosService";
import Article from "src/models/Article";
import { setPagination, setIsLoading } from "../slices/exploreArticles.slice";
import Pagination from "src/models/Pagination";

export const getArticles = () => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));

        const { currentPage, keyword, filter } = getState().exploreArticles;

        const params = {
            page: currentPage,
            keyword: keyword,
            filter: {
                range: {
                    start_date: filter.range.startDate,
                    end_date: filter.range.endDate,
                },
                source_id: filter.sourceId,
                category_id: filter.categoryId,
            }
        };

        try {
            const response = await axiosService.get("api/articles", { params });

            const pagination = Pagination.format(response.data);
            pagination.data = pagination.data.map((datum) => Article.format(datum));

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

