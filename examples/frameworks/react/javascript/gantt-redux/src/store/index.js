import { configureStore } from '@reduxjs/toolkit';
import { dataApi } from '../services/data';
import ganttDataReducer from './ganttDataSlice';
import uiReducer from './uiSlice';

const store = configureStore({
    reducer : {
        ganttData : ganttDataReducer,
        ui        : uiReducer,

        // dataApi is responsible for fetching data from the server
        [dataApi.reducerPath] : dataApi.reducer
    },

    middleware : getDefaultMiddleware =>
        getDefaultMiddleware().concat(dataApi.middleware)
});

export default store;
