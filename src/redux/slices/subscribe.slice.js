import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newFolderTitle: "",
    isLoadingFollow: false,
    isLoadingUnfollow: false,
};

const subscribeSlice = createSlice({
    name: 'subscribe',
    initialState: initialState,
    reducers: {
        setNewFolderTitle: (state, action) => {
            return {
                ...state,
                newFolderTitle: action.payload
            }
        },
        setIsLoadingFollow: (state, action) => {
            return {
                ...state,
                isLoadingFollow: Boolean(action.payload)
            };
        },
        setIsLoadingUnfollow: (state, action) => {
            return {
                ...state,
                isLoadingUnfollow: Boolean(action.payload)
            }
        },
        resetTitle: (state, action) => {
            return {
                ...state,
                newFolderTitle: ""
            }
        },
    },
})

export const { setNewFolderTitle, setIsLoadingFollow, setIsLoadingUnfollow, resetTitle } = subscribeSlice.actions
export default subscribeSlice.reducer