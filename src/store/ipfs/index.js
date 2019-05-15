import get from 'lodash.get';
import { createAction, createReducer } from 'redux-act';
import IPFS from 'ipfs';
import useRoom from 'ipfs-pubsub-room';
import {
    IPFS_ROOM_NAME
} from '../../constants';

const initialState = {
    peerId: null,
    instance: null,
    messages: [],
    peers: [],
    room: null,
    error: null
};

const INITIALIZE_PEER = 'lsn/ipfs/INITIALIZE_PEER';
const initializePeer = createAction(INITIALIZE_PEER);

const SET_ROOM = 'lsn/ipfs/SET_ROOM';
const setRoom = createAction(SET_ROOM);

const START_BROADCAST = 'lsn/ipfs/START_BROADCAST';
const startBroadcast = createAction(START_BROADCAST);

const RECEIVE_BROADCAST = 'lsn/ipfs/RECEIVE_BROADCAST';
const receiveBroadcast = createAction(RECEIVE_BROADCAST);

export const broadcast = (room, message) => {
    return (dispatch) => {
        dispatch(startBroadcast());
        room.broadcast(message);
        // return dispatch(receiveBroadcast(message));
    };
};

const PEER_JOINED = 'lsn/ipfs/PEER_JOINED';
const peerJoined = createAction(PEER_JOINED);

const PEER_LEFT = 'lsn/ipfs/PEER_LEFT';
const peerLeft = createAction(PEER_LEFT);

export function initIpfsNode() {
    return (dispatch) => {
        const ipfs = new IPFS({
            EXPERIMENTAL: {
                pubsub: true
            },
            config: {
                Addresses: {
                    Swarm: [
                        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
                    ]
                }
            }
        });

        dispatch(initializePeer(ipfs));

        ipfs.on('ready', () => {
            const room = useRoom(ipfs, IPFS_ROOM_NAME);

            room.on('peer joined', (peer) => {
                console.log('Peer joined the room', peer);
                dispatch(peerJoined(peer));
            });

            room.on('peer left', (peer) => {
                console.log('Peer left...', peer);
                dispatch(peerLeft(peer));
            });

            room.on('subscribed', (message) => {
                // so something with users peerId ipfs.id()
                console.log('Now connected!');
                // dispatch(subscribed(message));
            });

            room.on('message', (message) => {
                dispatch(receiveBroadcast(message.data.toString()));
            });

            dispatch(broadcast(room, 'Welcome everyone'));

            dispatch(setRoom(room));
        });
    };
};

const CLEAR_STORED_STATE = 'lsn/auth/CLEAR_STORED_STATE';
const clearStoredState = createAction(CLEAR_STORED_STATE);

export default createReducer({
    [initializePeer]: (state, payload) => ({
        ...state,
        ipfs: payload,
        error: null
    }),
    [setRoom]: (state, payload) => ({
        ...state,
        room: payload,
        error: null
    }),
    [startBroadcast]: (state) => ({ ...state }),
    [receiveBroadcast]: (state, payload) => {
        const obj = {
            ...state,
            error: null
        };

        if (!state.messages) {
            return {
                ...obj,
                messages: [payload]
            };
        }

        return {
            ...obj,
            messages: [ ...state.messages, payload ]
        };
    },
    [peerJoined]: (state, payload) => {
        const obj = {
            ...state
        };

        if (!state.peers) {
            return {
                ...obj,
                peers: [payload]
            };
        }

        return {
            ...obj,
            peers: [ ...state.peers, payload]
        };
    },
    [peerLeft]: (state, payload) => {
        return {
            ...state,
            peers: state.peers.filter(peer => peer !== payload)
        };
    },
    [clearStoredState]: (state) => initialState
}, initialState);

export const getIpfsInstance = (state) => get(state, ['ipfs', 'instance'], null);
export const getIpfsRoom = (state) => get(state, ['ipfs', 'room'], null);
export const getIpfsPeers = (state) => get(state, ['ipfs', 'peers'], null);
export const getIpfsMessages = (state) => get(state, ['ipfs', 'messages'], null);
export const getIpfsErrors = (state) => get(state, ['ipfs', 'error'], null);
