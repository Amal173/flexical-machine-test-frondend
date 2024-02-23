import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './Slice/blogSlice'
export default configureStore({
    reducer: {
        blog: blogReducer
    },
});