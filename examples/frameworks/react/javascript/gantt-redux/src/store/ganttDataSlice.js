import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // filename without extension `public/data`
    dataset : 'data'
};

const ganttDataSlice = createSlice({
    name : 'ganttData',
    initialState
});

export const ganttDataActions = ganttDataSlice.actions;

const ganttDataReducer = ganttDataSlice.reducer;
export default ganttDataReducer;
