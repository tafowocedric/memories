import { AUTH, LOGOUT } from '../constants/actionTypes';
import * as api from '../../api/index';

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT });
    } catch (error) {
        console.log(error);
    }
};

export const signup = (userdata, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(userdata);
        dispatch({ type: AUTH, payload: data });
        history.push('/');
    } catch (error) {
        const { message } = JSON.parse(error.request.response);
        alert(message);
    }
};

export const signin = (userdata, history) => async (dispatch) => {
    try {
        const { data } = await api.signin(userdata);
        dispatch({ type: AUTH, payload: data });
        history.push('/');
    } catch (error) {
        const { message } = JSON.parse(error.request.response);
        alert(message);
    }
};
