import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { loadState, saveState } from './local-storage';
import { isAuthenticated } from './auth';
import { initIpfsNode } from './ipfs';

const initialState = loadState();

const middleware = process.env.NODE_ENV !== 'production' ?
    applyMiddleware(thunk, logger) :
    applyMiddleware(thunk);

// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    middleware
);

store.subscribe(() => {
    saveState(store.getState());
});

function initStore({ dispatch, getState }) {
    if (isAuthenticated(getState())) {
        dispatch(initIpfsNode());
    }
}

initStore(store);

export default store;