
import { LOCAL_STORAGE_NS } from '../../constants';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_NS);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(LOCAL_STORAGE_NS, serializedState);
    } catch (err) {
        return undefined;
    }
}


export const clearState = () => {
    try {
        localStorage.removeItem(LOCAL_STORAGE_NS);
    } catch (err) {
        return undefined;
    }
}