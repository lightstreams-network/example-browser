import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { loadState, saveState } from './local-storage';

const initialState = loadState();
const middleware = applyMiddleware(thunk, logger);
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    initialState,
    reduxDevTools(
        middleware
    )
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;