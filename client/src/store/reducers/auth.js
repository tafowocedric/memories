import { AUTH, LOGOUT } from '../constants/actionTypes';

const initialState = { authData: null };

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(payload));
            return { ...state, ...payload };

        case LOGOUT:
            return { ...state, payload: null };

        default:
            return state;
    }
};

export default authReducer;
