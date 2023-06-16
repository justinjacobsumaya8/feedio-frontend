import { createSlice } from '@reduxjs/toolkit'
import Author from 'src/models/Author';

const initialState = {
    isLoading: false,
    authorId: null,
    author: Author.format({}),
    showAuthorModal: false,
};

const showAuthorSlice = createSlice({
    name: 'showAuthor',
    initialState: initialState,
    reducers: {
        setAuthorId: (state, action) => {
            return {
                ...state,
                authorId: parseInt(action.payload)
            }
        },
        setAuthor: (state, action) => {
            return {
                ...state,
                author: action.payload
            }
        },
        setIsLoading: (state, action) => {
            return {
                ...state,
                isLoading: Boolean(action.payload)
            }
        },
        setShowAuthorModal: (state, action) => {
            return {
                ...state,
                showAuthorModal: Boolean(action.payload)
            }
        },
    },
})

export const { setAuthorId, setAuthor, setIsLoading, setShowAuthorModal } = showAuthorSlice.actions
export default showAuthorSlice.reducer