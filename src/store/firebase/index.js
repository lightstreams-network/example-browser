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
            .ref(`/subscribers/${subscriberId}`)
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
            .ref(`/subscribers/${subscriberId}`)
            .child('contribution_details')
            .child('ethereum')
            .set(ethereumAddress);

        dispatch(handleWalletChanged(subscriberId));
    };
}

function handleAuthStateChanged(user) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            const u = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                emailVerified: user.emailVerified

            };

            firebase.database().ref(`/uids/${user.uid}`).on('value', (snapshot) => {
                if (snapshot.val() === null) {
                    const err = { code: FIREBASE_NO_UID_CODE, message: FIREBASE_NO_UID_MESSAGE };
                    dispatch(receiveAuthError(err));
                    return reject(err);
                }

                const { subscriberId } = snapshot.val();

                dispatch(setSubscriberId(subscriberId));

                return firebase.database().ref(`/subscribers/${subscriberId}`).on('value', (subscriberSnapshot) => {
                    if (subscriberSnapshot.val === null) {
                        const err = { code: FIREBASE_NO_UID_CODE, message: FIREBASE_NO_UID_MESSAGE };
                        dispatch(receiveAuthError(err));
                        return reject(err);
                    }
                    const subscriber = subscriberSnapshot.val();
                    resolve(dispatch(receiveUser({ ...u, ...subscriber })));
                });
            });

        });
    };
}

export function initializeFirebase() {
    return (dispatch) => {
        firebase.initializeApp(config);
        return dispatch(setFirebase(firebase));
    };
};

export function signInWithEmailAndPassword(username, password) {
    return (dispatch) => {
        dispatch(requestUser());
        return firebase.auth()
            .signInWithEmailAndPassword(username, password)
            .then(({ user }) => {
                return dispatch(handleAuthStateChanged(user));
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