import { createSlice } from '@reduxjs/toolkit'
import UserFolder from 'src/models/UserFolder';

const initialState = {
    userFolder: UserFolder.format({}),
    isLoading: false,
};

const activeUserFolderSlice = createSlice({
    name: 'activeUserFolder',
    initialState: initialState,
    reducers: {
        setUserFolder: (state, action) => {
            return {
                ...state,
                userFolder: { ...action.payload }
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

export const { setUserFolder, setIsLoading, reset } = activeUserFolderSlice.actions
export default activeUserFolderSlice.reducer