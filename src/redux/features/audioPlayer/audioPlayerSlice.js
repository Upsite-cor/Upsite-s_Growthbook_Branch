import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    isPlayerReady: false
}
const audioPlayerSlice  = createSlice({
    name: 'audioPlayer',
    initialState: initialState,
    reducers:{
        playerReady: (state) =>{
            state.isPlayerReady=true;
        },
        playerNotReady: (state) =>{
            state.isPlayerReady = false;
        }
    }
});

export const {playerReady, playerNotReady} = audioPlayerSlice.actions;
export default audioPlayerSlice.reducer;

