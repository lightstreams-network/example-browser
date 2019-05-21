import  get from 'lodash.get';
import { initIpfsNode, getIpfsInited } from '../ipfs';
import { hPost } from '../../lib/fetch';

const initialState = {
    user: null,
    error: null,
    token: null
};

export const REQUEST_TOKEN = 'lsn/auth/REQUEST_TOKEN';
export function requestToken(username, password) {
    return {
        type: REQUEST_TOKEN,
        payload: {
            username,
            password
        }
    };
};

const RECEIVE_TOKEN = 'lsn/auth/RECEIVE_TOKEN';
function receiveToken(token) {
    return {
        type: RECEIVE_TOKEN,
        payload: token
    }
}

const RECEIVE_AUTH_ERROR = 'lsn/auth/RECEIVE_AUTH_ERROR';
export function receiveAuthError(error) {
    return {
        type: RECEIVE_AUTH_ERROR,
        payload: error
    };
}

export function fetchToken({ account, password }) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(requestToken(account, password));

            return hPost('/user/signin', { account, password })
                .then((response) => {
                    if (!getIpfsInited(getState())) dispatch(initIpfsNode());
                    dispatch(receiveToken(response.token));
                    resolve(dispatch(receiveUser({ account, password })));
                })
                .catch((error) => {
                    dispatch(receiveAuthError(error));
                    reject(error);
                });
        });

    }
}

const REQUEST_CREATE_USER = 'lsn/auth/REQUEST_CREATE_USER';
function requestCreateUser() {
    return {
        type: REQUEST_CREATE_USER,
        payload: null
    };
}

const REQUEST_USER = 'lsn/auth/REQUEST_USER';
export function requestUser() {
    return {
        type: REQUEST_USER,
        payload: null
    };
}

const RECEIVE_USER = 'lsn/auth/RECEIVE_USER';
export function receiveUser(user) {
    return {
        type: RECEIVE_USER,
        payload: user
    };
}

const CLEAR_STORED_STATE = 'lsn/auth/CLEAR_STORED_STATE';
export function clearStoredState() {
    return {
        type: CLEAR_STORED_STATE,
        payload: null
    }
}

export function createUser({ password }) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(requestCreateUser());

            return hPost('/user/signup', { password })
                .then((response) => {
                    resolve(dispatch(fetchToken({ account: response.account, password })));
                    return response;
                })
                .catch((error) => {
                    reject(dispatch(receiveAuthError(error)));
                    throw error;
                });
        });
    };
}

export default function authReducer(state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_TOKEN:
            return {
                ...state,
                isFetching: true,
                error: null,
                lastRequestedAt: (new Date()).toISOString(),
            };
        case RECEIVE_TOKEN:
            return {
                ...state,
                isFetching: false,
                token: action.payload,
                error: null,
            };

        case RECEIVE_AUTH_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        case REQUEST_CREATE_USER:
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case REQUEST_USER:
            return {
                ...state,
                user: {
                    ...state.user
                }
            };

        case RECEIVE_USER:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };

        case CLEAR_STORED_STATE:
            return initialState;

        default:
            return state;
    }
};

export const getAuthenticatedUser = (state) => get(state, ['auth', 'user'], null)
export const getUserToken = (state) => get(state, ['auth', 'token'], null)
export const isAuthenticated = (state) => getAuthenticatedUser(state) !== null;
export const getAuthErrors = (state) => get(state, ['auth', 'error'], null)