import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './state';

const slice = createSlice({
    'name': 'assets',
    initialState,
    reducers: {
        sayHi() {
            console.log("hello");
        }
    }
});

export default slice.reducer;