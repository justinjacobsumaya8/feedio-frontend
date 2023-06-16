import { createSlice } from '@reduxjs/toolkit'
import Pagination from 'src/models/Pagination';

const initialState = {
    pagination: Pagination.format({}),
    isLoading: false,
    currentPage: 1,
    showFeedBy: "source",
    showFeedByOptions: [
        "source",
        "category",
        "author"
    ],
};

const userFeedSlice = createSlice({
    name: 'userFeed',
    initialState: initialState,
    reducers: {
        setPagination: (state, action) => {
            return {
                ...state,
                pagination: action.payload
            }
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        setCurrentPage: (state, action) => {
            return {
                ...state,
                currentPage: parseInt(action.payload),
            };
        },
        setShowFeedBy: (state, action) => {
            return {
                ...state,
                showFeedBy: action.payload
            }
        }
    },
})

export const { setPagination, setIsLoading, setCurrentPage, setShowFeedBy } = userFeedSlice.actions
export default userFeedSlice.reducer