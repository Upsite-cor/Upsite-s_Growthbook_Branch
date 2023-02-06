import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    courseId: "",
    media: [],
}
const courseSlice  = createSlice({
    name: 'course',
    initialState: initialState,
    reducers:{
        updateCourseId: (state, action) =>{
            state.courseId=action.payload;
        },
        updateMedia: (state, action)=>{
            state.media = [...action.payload];
        }
    }
});

export const {updateCourseId, updateMedia} = courseSlice.actions;
export default courseSlice.reducer;

