import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    message: null,
    type: null
};

const alertSlice = createSlice({
    name: 'alert',
    initialState: initialState,
    reducers: {
        setAlert: (state, action) => {
            const { message, type } = action.payload;
            return {
                ...state,
                message,
                type
            };
        },
        resetAlert: (state, action) => {
            return {
                ...state,
                message: initialState.message,
                type: initialState.type
            }
        }
    },
})

export const { setAlert, resetAlert } = alertSlice.actions
export default alertSlice.reducer