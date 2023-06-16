import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    email: "",
    password: "",
    confirmPassword: ""
};

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: initialState,
    reducers: {
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            };
        },
        setEmail: (state, action) => {
            return {
                ...state,
                email: action.payload
            }
        },
        setPassword: (state, action) => {
            return {
                ...state,
                password: action.payload
            }
        },
        setConfirmPassword: (state, action) => {
            return {
                ...state,
                confirmPassword: action.payload
            }
        },
        reset: (state, action) => {
            return {
                ...initialState
            }
        }
    },
})

export const {
    setIsLoading,
    setEmail,
    setPassword,
    setConfirmPassword,
    reset
} = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer