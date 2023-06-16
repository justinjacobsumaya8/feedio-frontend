import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    userFolderSubscriptions: [],
};

const allSubscriptionsSlice = createSlice({
    name: 'allSubscriptions',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        setUserFolderSubscriptions: (state, action) => {
            return {
                ...state,
                userFolderSubscriptions: [...action.payload]
            }
        },
    },
})

export const { setIsLoading, setUserFolderSubscriptions } = allSubscriptionsSlice.actions
export default allSubscriptionsSlice.reducer