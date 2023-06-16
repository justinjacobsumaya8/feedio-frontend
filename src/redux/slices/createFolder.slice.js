import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: "",
    isCreateModalOpen: false,
    isLoading: false
};

const createFolderSlice = createSlice({
    name: 'createFolder',
    initialState: initialState,
    reducers: {
        setTitle: (state, action) => {
            return {
                ...state,
                title: action.payload
            }
        },
        setIsCreateModalOpen: (state, action) => {
            return {
                ...state,
                isCreateModalOpen: Boolean(action.payload)
            };
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        reset: (state, action) => {
            return {
                ...initialState
            }
        }
    },
})

export const { setTitle, setIsCreateModalOpen, setIsLoading, reset } = createFolderSlice.actions
export default createFolderSlice.reducer