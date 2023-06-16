import { createSlice } from '@reduxjs/toolkit'
import User from 'src/models/User';

const initialState = {
    authenticatedUser: User.format({}),
    isLoggingIn: false,
    isLoggingOut: false
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        setIsLoggingIn: (state, action) => {
            return {
                ...state,
                isLoggingIn: Boolean(action.payload)
            };
        },
        setIsLoggingOut: (state, action) => {
            return {
                ...state,
                isLoggingOut: Boolean(action.payload)
            };
        },
        setAuthenticatedUser: (state, action) => {
            return {
                ...state,
                authenticatedUser: action.payload
            };
        },
        saveLogout: (state, action) => {
            return {
                ...initialState
            };
        }
    },
})

export const {
    setIsLoggingIn,
    setIsLoggingOut,
    setAuthenticatedUser,
    saveLogout,
} = authenticationSlice.actions
export default authenticationSlice.reducer