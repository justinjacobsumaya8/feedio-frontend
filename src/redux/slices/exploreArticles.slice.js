import { createSlice } from "@reduxjs/toolkit";
import Article from "src/models/Article";
import Pagination from "src/models/Pagination";

const initialState = {
    isLoading: false,
    pagination: Pagination.format({}),
    currentPage: 1,
    showAddFilter: false,
    keyword: "",
    filter: {
        range: {
            startDate: "",
            endDate: "",
        },
        sourceId: "",
        categoryId: "",
    },
    showArticleModal: false,
    activeArticle: Article.format({}),
};

const exploreArticlesSlice = createSlice({
    name: "exploreArticles",
    initialState: initialState,
    reducers: {
        setPagination: (state, action) => {
            return {
                ...state,
                pagination: action.payload,
            };
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload),
            };
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: parseInt(action.payload),
            };
        },
        setKeyword: (state, action) => {
            return {
                ...state,
                keyword: action.payload,
            };
        },
        setShowAddFilter: (state, action) => {
            return {
                ...state,
                showAddFilter: Boolean(action.payload),
            };
        },
        setShowArticleModal: (state, action) => {
            return {
                ...state,
                showArticleModal: Boolean(action.payload),
            };
        },
        setActiveArticle: (state, action) => {
            return {
                ...state,
                activeArticle: action.payload,
            };
        },
        setFilter: (state, action) => {
            return {
                ...state,
                filter: action.payload,
            };
        },
        resetFilter: (state, action) => {
            state.filter[action.payload] = initialState.filter[action.payload];
        },
    },
});

export const {
    setPagination,
    setIsLoading,
    setCurrentPage,
    setKeyword,
    setShowAddFilter,
    setShowArticleModal,
    setActiveArticle,
    setFilter,
    resetFilter,
} = exploreArticlesSlice.actions;
export default exploreArticlesSlice.reducer;