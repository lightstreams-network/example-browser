import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import  get from 'lodash.get';
import {
    FIREBASE_NO_UID_CODE,
    FIREBASE_NO_UID_MESSAGE
} from '../../constants';
import {
    requestUser,
    receiveUser,
    receiveAuthError,
    clearStoredState
} from '../auth';

const config = {
    apiKey: 'AIzaSyAdm3DV2ifkn1KuUgOVZMR3T1mhcPrkRi8',
    authDomain: 'lightstreams-whitelist.firebaseapp.com',
    databaseURL: 'https://lightstreams-whitelist.firebaseio.com',
    projectId: 'lightstreams-whitelist',
    storageBucket: 'lightstreams-whitelist.appspot.com',
    messagingSenderId: '128792169013'
};

const initialState = {
    app: null,
    lastRequestedAt: null,
    subscriberId: null,
    resetSent: false,
    resetError: null
};

export const SET_FIREBASE = 'lsn/firebase/SET_FIREBASE';
export function setFirebase(app) {
    return {
        type: SET_FIREBASE,
        payload: app
    };
};

export const SET_SUBSCRIBER_ID = 'lsn/firebase/SET_SUBSCRIBER_ID';
export function setSubscriberId(subscriberId) {
    return {
        type: SET_SUBSCRIBER_ID,
        payload: subscriberId
    };
};

export const REQUEST_UPDATE_WALLET = 'lsn/firebase/REQUEST_UPDATE_WALLET';
export function requestUpdateWallet() {
    return {
        type: REQUEST_UPDATE_WALLET,
        payload: null
    };
};

export const RECEIVE_UPDATE_WALLET = 'lsn/firebase/RECEIVE_UPDATE_WALLET';
export function receiveWalletUpdate(ethereumAddress) {
    return {
        type: RECEIVE_UPDATE_WALLET,
        payload: ethereumAddress
    };
};

export function signOut() {
    return (dispatch) => {
        firebase
            .auth()
            .signOut()
            .finally(() =>
                dispatch(clearStoredState())
            );
    };
}

export function handleWalletChanged(subscriberId) {
    return (dispatch) => {
        firebase
            .database()
            .ref(`test/subscribers/${subscriberId}`)
            .child('contribution_details')
            .child('ethereum')
            .on('value', (snapshot) => {
                const value = snapshot.val();
                if (value === null) {
                    return;
                }
                dispatch(receiveWalletUpdate(value));
            });
    };
}

export function updateWallet(subscriberId, ethereumAddress) {
    return (dispatch) => {
        dispatch(requestUpdateWallet());
        firebase
            .database()
            .ref(`test/subscribers/${subscriberId}`)
            .child('contribution_details')
            .child('ethereum')
            .set(ethereumAddress);

        dispatch(handleWalletChanged(subscriberId));
    };
}

const handleAuthStateChanged = (user) => {
    return (dispatch) => {
        if (!user) return dispatch(signOut());

        const u = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified

        };

        return firebase.database().ref('/test/subscribers')
            .orderByChild('uid')
            // .equalTo('p55bQ5EGmYZLASmxjRQn9ZNryM82')
            .equalTo(user.uid)
            .on('value', (snapshot) => {
                if (snapshot.val() === null) {
                    dispatch(receiveAuthError({ code: FIREBASE_NO_UID_CODE, message: FIREBASE_NO_UID_MESSAGE }));
                    // the next line is to avoid weird states where the user is logged in but no
                    // subscriber is found
                    // dispatch(signOut());
                    return;
                }

                const matches = Object.keys(snapshot.val()).map((k, i) => {
                    if (i < 1) dispatch(setSubscriberId(k));
                    return snapshot.val()[k];
                });

                dispatch(receiveUser({ ...u, ...matches[0] }));
            });
    };
};

export function initializeFirebase() {
    return (dispatch, getState) => {
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => handleAuthStateChanged(user)(dispatch, getState));
        return dispatch(setFirebase(firebase));
    };
};

export function signInWithEmailAndPassword(username, password, errorCb) {
    return (dispatch) => {
        dispatch(requestUser());
        return firebase.auth()
            .signInWithEmailAndPassword(username, password)
            .catch((error) => {
                dispatch(receiveAuthError(error));
                errorCb(error);
            });
    };
};

export const REQUEST_RESET = 'lsn/firebase/REQUEST_RESET';
function requestReset() {
    return {
        type: REQUEST_RESET,
        payload: null
    };
};

export const CONFIRM_RESET_SENT = 'lsn/firebase/CONFIRM_RESET_SENT';
function confirmResetSent() {
    return {
        type: CONFIRM_RESET_SENT,
        payload: null
    };
};

export const RECEIVE_RESET_ERROR = 'lsn/firebase/RECEIVE_RESET_ERROR';
function receiveResetError(error) {
    return {
        type: RECEIVE_RESET_ERROR,
        payload: error
    };
};

export function resetPassword(email) {
    return (dispatch) => {
        dispatch(requestReset())
        return (
            firebase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    return dispatch(confirmResetSent());
                })
                .catch((error) => {
                    dispatch(receiveResetError(error));
                })
        );

    };
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case SET_FIREBASE:
        return {
            ...state,
            app: action.payload,
            lastRequestedAt: (new Date()).toISOString(),
        };

    case SET_SUBSCRIBER_ID:
        return {
            ...state,
            subscriberId: action.payload,
        };

    case REQUEST_UPDATE_WALLET:
        return {
            ...state,
            requestUpdateWallet: true,
        };

    case RECEIVE_UPDATE_WALLET:
        return {
            ...state,
            requestUpdateWallet: false,
            wallet: action.payload
        };

    case REQUEST_RESET:
        return {
            ...state,
            resetSent: false
        };

    case CONFIRM_RESET_SENT:
        return  {
            ...state,
            resetSent: true
        };

    case RECEIVE_RESET_ERROR:
        return {
            ...state,
            resetSent: true,
            resetError: action.payload
        };

    default:
        return state;
    }
};

export const getFirebaseApp = (state) => get(state, ['firebase', 'app'], null);
export const getFirebaseDb = (state) => getFirebaseApp(state).database();
export const getSubscribers = (state) => getFirebaseDb(state).ref('/subscribers');
export const getSubscriber = (uid) => (state) => getSubscribers(state).orderByChild('uid').equalTo(uid, 'uid');
export const getSubscriberId = (state) => get(state, ['firebase', 'subscriberId'], null);
export const getWalletAddress = (state) => get(state, ['firebase', 'wallet'], null);