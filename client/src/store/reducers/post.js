const initialState = [];

const reducer = (state = [initialState], { type, payload }) => {
    switch (type) {
        case 'FETCH_ALL':
            return payload;

        case 'CREATE':
            return { ...state, payload };

        default:
            return state;
    }
};

export default reducer;
