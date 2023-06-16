import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    categories: [],
};

const commonCategoriesSlice = createSlice({
    name: 'commonCategories',
    initialState: initialState,
    reducers: {
        setCategories: (state, action) => {
            return {
                ...state,
                categories: action.payload
            };
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            };
        },
    },
})

export const {
    setCategories,
    setIsLoading,
} = commonCategoriesSlice.actions
export default commonCategoriesSlice.reducer