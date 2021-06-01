import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

const initialState = [];

const postsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_ALL:
            return payload;

        case CREATE:
            return { ...state, payload };

        case UPDATE:
            return state.map((post) => (post._id === payload._id ? payload : post));

        case DELETE:
            return state.filter((post) => post._id !== payload);

        default:
            return state;
    }
};

export default postsReducer;
