import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    sources: [],
};

const commonSourcesSlice = createSlice({
    name: 'commonSources',
    initialState: initialState,
    reducers: {
        setSources: (state, action) => {
            return {
                ...state,
                sources: action.payload
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
    setSources,
    setIsLoading,
} = commonSourcesSlice.actions
export default commonSourcesSlice.reducer