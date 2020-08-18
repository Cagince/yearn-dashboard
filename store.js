import { combineReducers, configureStore  } from '@reduxjs/toolkit';
import assetsReducer from './components/products/earn/store/slice';

const reducer = combineReducers({
    /** @example: assets: assetsReducer */
    assets: assetsReducer
});

const initialState = {};

const initStore = (preloadedState = initialState ) => configureStore({
    reducer,
    // preloadedState
});

const store = initStore();

export default store;
