import { createSlice } from '@reduxjs/toolkit'
import Category from 'src/models/Category';

const initialState = {
    isLoading: false,
    category: Category.format({}),
    showCategoryModal: false,
};

const showCategorySlice = createSlice({
    name: 'showCategory',
    initialState: initialState,
    reducers: {
        setCategory: (state, action) => {
            return {
                ...state,
                category: action.payload
            }
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        setShowCategoryModal: (state, action) => {
            return {
                ...state,
                showCategoryModal: Boolean(action.payload)
            }
        },
    },
})

export const { setCategory, setIsLoading, setShowCategoryModal } = showCategorySlice.actions
export default showCategorySlice.reducer