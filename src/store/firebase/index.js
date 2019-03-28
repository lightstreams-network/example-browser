import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import  get from 'lodash.get';

import {
    requestUser,
    receiveUser,
    receiveAuthError,
    clearStoredState,
    getAuthenticatedUser
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

export const SET_FIREBASE = 'lsn/firebase/SAVE_FIREBASE';
export function setFirebase(app) {
    return {
        type: SET_FIREBASE,
        payload: app
    };
};

export function handleAuthenticationStateChange(user) {

    return (dispatch) => {
        debugger;
        // if (!user) return dispatch(clearUser());
        return dispatch(receiveUser(user));
    };
};

export function initializeFirebase() {
    return (dispatch, getState) => {
        const firebaseApp = firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) return;
            const u = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified

            };
            dispatch(receiveUser(u));
            getSubscriber('Ftux27K84gOabNMlwRyKDpmor8D3')(getState())
                .once('value')
                .then((snapshot) => console.log('THISSSS', value));
        });
        return dispatch(setFirebase(firebase));
    };
};

export function signInWithEmailAndPassword(username, password) {
    return (dispatch) => {
        dispatch(requestUser());
        return firebase.auth()
            .signInWithEmailAndPassword(username, password)
            .catch((error) => dispatch(receiveAuthError(error)));
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

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
    case SET_FIREBASE:
        return {
            ...state,
            app: action.payload,
            lastRequestedAt: (new Date()).toISOString(),
        };
    default:
        return state;
    }
};

export const getFirebaseApp = (state) => get(state, ['firebase', 'app'], null);
export const getFirebaseDb = (state) => getFirebaseApp(state).database();
export const getSubscribers = (state) => getFirebaseDb(state).ref('/subscribers');
export const getSubscriber = (uid) => (state) => getSubscribers(state).equalTo(uid, 'uid');