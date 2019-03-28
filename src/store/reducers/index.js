import { combineReducers } from 'redux';
import authReducer from '../auth';
import firebaseReducer from '../firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    firebase: firebaseReducer
});

export default rootReducer;
