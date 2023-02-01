import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    course: null,
    media: [],
}
const courseSlice  = createSlice({
    name: 'course',
    initialState: initialState,
    reducers:{
        updateCourse: (state, action) =>{
            state.course=action.payload;
        },
        updateMedia: (state, action)=>{
            state.media = [...action.payload];
        }
    }
});

export const {updateCourse, updateMedia} = courseSlice.actions;
export default courseSlice.reducer;

