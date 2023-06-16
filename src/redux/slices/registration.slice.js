import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    hasAgreedToTerms: false,
};

const registrationSlice = createSlice({
    name: 'registration',
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
            };
        },
        setFullName: (state, action) => {
            return {
                ...state,
                fullName: action.payload
            };
        },
        setPassword: (state, action) => {
            return {
                ...state,
                password: action.payload
            };
        },
        setConfirmPassword: (state, action) => {
            return {
                ...state,
                confirmPassword: action.payload
            };
        },
        setHasAgreedToTerms: (state, action) => {
            return {
                ...state,
                hasAgreedToTerms: Boolean(action.payload)
            };
        },
        resetPassword: (state, action) => {
            return {
                ...state,
                password: initialState.password,
                confirmPassword: initialState.confirmPassword,
            }
        },
        reset: (state, action) => {
            return initialState;
        }
    },
})

export const {
    setIsLoading,
    setEmail,
    setFullName,
    setPassword,
    setConfirmPassword,
    setHasAgreedToTerms,
    resetPassword,
    reset
} = registrationSlice.actions
export default registrationSlice.reducer