import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import  get from 'lodash.get';

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
    app: null
};

export const SET_FIREBASE = 'lsn/firebase/SET_FIREBASE';
export function setFirebase(app) {
    return {
        type: SET_FIREBASE,
        payload: app
    };
};

export const SET_SUBSCRIBER = 'lsn/firebase/SET_SUBSCRIBER';
export function setSubscriber(id) {
    return {
        type: SET_SUBSCRIBER,
        payload: id
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

const handleAuthStateChanged = (user) => {
    return (dispatch, getState) => {
        if (!user) return dispatch(signOut());

        const u = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            emailVerified: user.emailVerified

        };

        return getSubscribers(getState())
            .orderByChild('uid')
            .equalTo(user.uid)
            .on('value', (snapshot) => {
                if (snapshot.val() === null) {
                    dispatch(receiveAuthError({ message: 'No subscriber with this uid' }));
                    // the next line is to avoid weird states where the user is logged in but no
                    // subscriber is found
                    dispatch(signOut());
                    return;
                }
                const matches = Object.keys(snapshot.val()).map(k => snapshot.val()[k]);
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
                    // console.log('Sent');
                    return dispatch(confirmResetSent());
                })
                .catch((error) => {
                    // console.log('Error', error);
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