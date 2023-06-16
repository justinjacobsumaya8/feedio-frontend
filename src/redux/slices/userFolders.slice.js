import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userFolders: [],
    isLoading: false,
};

const userFoldersSlice = createSlice({
    name: 'userFolders',
    initialState: initialState,
    reducers: {
        setUserFolders: (state, action) => {
            action.payload.forEach((userFolder) => {
                let totalCount = 0;
                userFolder.userFolderSubscriptions.forEach(({ userFeedsCount }) => {
                    totalCount += userFeedsCount;
                });
                userFolder.totalArticleCount = totalCount;
            });

            return {
                ...state,
                userFolders: [...action.payload]
            }
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

export const { setUserFolders, setIsLoading, reset } = userFoldersSlice.actions
export default userFoldersSlice.reducer