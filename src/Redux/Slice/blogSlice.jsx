import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    blogs: [],
    singleBlog:{}

}

export const CreateBlog = createAsyncThunk('blog/CreateTasks', async (values ) => {
    console.log(values);
    const response = await axios.post(`http://localhost:5050/blog`,  values );
    console.log("response data create blog", response);
    return response.data
})

export const getBlog = createAsyncThunk('blog/getoneTasks', async () => {
    const response = await axios.get(`http://localhost:5050/blog`,);
    console.log("response data get blog", response);
    return response.data
});

export const getOneBlog = createAsyncThunk('blog/getTasks', async (id) => {
    console.log(id);
    const response = await axios.get(`http://localhost:5050/blog/${id}`,);
    console.log("response data get blog", response)
    return response.data
});

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder.addCase(getBlog.fulfilled, (state, { payload }) => {
            state.blogs = payload;
        })
        builder.addCase(getOneBlog.fulfilled, (state, { payload }) => {
            state.singleBlog = payload;
        })

    },

});


export const { } = blogSlice.actions;

export default blogSlice.reducer;
