import { combineReducers, configureStore  } from '@reduxjs/toolkit';

const reducer = combineReducers({
    /** @example: assets: assetsReducer */
});

const initialState = {};

const initStore = (preloadedState = initialState ) => configureStore({
    reducer,
    preloadedState
});

const store = initStore();

export default store;
