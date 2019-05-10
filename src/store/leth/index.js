import get from 'lodash.get';
import { createAction, createReducer } from 'redux-act';
import { hGet, hPost } from '../../lib/fetch';

const initialState = {
    files: [],
    balance: null,
    error: null
};

const REQ_LETH_WALLET_BALANCE = 'lsn/leth/REQ_LETH_WALLET_BALANCE';
const requestLethWalletBalance = createAction(REQ_LETH_WALLET_BALANCE);

const RES_LETH_WALLET_BALANCE = 'lsn/leth/RES_LETH_WALLET_BALANCE';
const responseLethWalletBalance = createAction(RES_LETH_WALLET_BALANCE);

const REQ_LETH_STORAGE_ADD = 'lsn/leth/REQ_LETH_STORAGE_ADD';
const requestLethStorageAdd = createAction(REQ_LETH_STORAGE_ADD);

const RES_LETH_STORAGE_ADD = 'lsn/leth/RES_LETH_STORAGE_ADD';
const responseLethStorageAdd = createAction(RES_LETH_STORAGE_ADD);

const RECEIVE_LETH_ERROR = 'lsn/leth/RECEIVE_LETH_ERROR';
const receiveLethError = createAction(RECEIVE_LETH_ERROR);

export function lethWalletBalance(account) {
    return (dispatch) => {
        dispatch(requestLethWalletBalance());

        return hGet('/wallet/balance', { account })
            .then(response => dispatch(responseLethWalletBalance(response)))
            .catch(error => dispatch(receiveLethError(error)));
    };
}

export function lethStorageAdd({ account, password, files }) {
    return (dispatch) => {
        dispatch(requestLethStorageAdd());

        const formData = new FormData();
        formData.append('owner', account);
        formData.append('password', password);

        const filename = files[0].name;

        files.forEach(file => {
            formData.append('file', file);
        });

        return hPost('/storage/add', formData, { 'Content-Type': 'multipart/form-data' })
            .then((response) => {
                dispatch(responseLethStorageAdd({ filename, ...response}));
                dispatch(lethWalletBalance(account));
                return response;
            })
            .catch((error) => {
                dispatch(receiveLethError(error));
                throw error;
            });
    };
}

const CLEAR_STORED_STATE = 'lsn/auth/CLEAR_STORED_STATE';
const clearStoredState = createAction(CLEAR_STORED_STATE);

export default createReducer({
    [requestLethStorageAdd]: (state) => ({
        ...state,
        isFetching: true,
        error: null,
        lastRequestedAt: (new Date()).toISOString(),
    }),
    [responseLethStorageAdd]: (state, payload) => {
        const obj = {
            ...state,
            isFetching: false,
            error: null
        };

        if (!state.files) {
            return {
                ...obj,
                files: [{ ...payload }]
            };
        }

        return {
            ...obj,
            files: [ ...state.files, { ...payload } ]
        };
    },
    [receiveLethError]: (state, payload) => ({
        ...state,
        isFetching: false,
        error: payload
    }),
    [requestLethWalletBalance]: (state) => ({
        ...state,
        isFetching: true,
        error: null,
        lastRequestedAt: (new Date()).toISOString(),
    }),
    [responseLethWalletBalance]: (state, payload) => ({
        ...state,
        isFetching: false,
        balance: payload.balance,
        error: null,
    }),
    [clearStoredState]: (state) => initialState
}, initialState);

export const getLethFiles = (state) => get(state, ['leth', 'files'], null);
export const getLethErrors = (state) => get(state, ['leth', 'error'], null);
export const getWalletBalance = (state) => get(state, ['leth', 'balance'], null);