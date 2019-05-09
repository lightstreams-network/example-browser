import get from 'lodash.get';
import { hPost } from '../../lib/fetch';

const initialState = {
    files: [],
    error: null
};

export const REQ_LETH_STORAGE_ADD = 'lsn/leth/REQ_LETH_STORAGE_ADD';
export function requestLethStorageAdd() {
    return {
        type: REQ_LETH_STORAGE_ADD,
        payload: null
    };
};

const RES_LETH_STORAGE_ADD = 'lsn/leth/RES_LETH_STORAGE_ADD';
function responseLethStorageAdd({ filename, acl, meta }) {
    return {
        type: RES_LETH_STORAGE_ADD,
        payload: {
            filename,
            acl,
            meta
        }
    };
}

const RECEIVE_LETH_ERROR = 'lsn/leth/RECEIVE_LETH_ERROR';
export function receiveLethError(error) {
    return {
        type: RECEIVE_LETH_ERROR,
        payload: error
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
                return response;
            })
            .catch((error) => {
                dispatch(receiveLethError(error));
                throw error;
            });
    };
}

const CLEAR_STORED_STATE = 'lsn/auth/CLEAR_STORED_STATE';
export function clearStoredState() {
    return {
        type: CLEAR_STORED_STATE,
        payload: null
    };
}

export default function lethReducer(state = initialState, action = {}) {
    switch (action.type) {
    case REQ_LETH_STORAGE_ADD:
        return {
            ...state,
            isFetching: true,
            error: null,
            lastRequestedAt: (new Date()).toISOString(),
        };

    case RES_LETH_STORAGE_ADD:
        return {
            ...state,
            isFetching: false,
            files: [
                ...state.files,
                { ...action.payload }
            ],
            error: null,
        };

    case RECEIVE_LETH_ERROR:
        return {
            ...state,
            isFetching: false,
            error: action.payload
        };

    case CLEAR_STORED_STATE:
        return initialState;

    default:
        return state;
    }
};

export const getLethFiles = (state) => get(state, ['leth', 'files'], null);
export const getLethErrors = (state) => get(state, ['leth', 'error'], null);