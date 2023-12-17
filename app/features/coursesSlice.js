import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchCourses} from "../services/courses";


const initialState = {
  status: "idle",
  courses: [],
  error: {},
};

export const getAllCourses = createAsyncThunk("/courses/getCourses", async () => {
    const {data} = await fetchCourses();
    return data.data.courses;
});



const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.status= "completed";
        state.courses= action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
}});

export default coursesSlice.reducer

