import { configureStore } from '@reduxjs/toolkit'
import documentsReducer from '../slices/documents'
export const store = configureStore({
    reducer: {
        documents: documentsReducer,
    },
})
