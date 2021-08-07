const defaultState = {
    entities: null
};

export function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'DELETE_USER': {
            return { ...state, entities: state.entities.filter(user => user.id !== action.payload) };
        }
        case 'LOAD_USERS_SUCCESS': {
            return { ...state, entities: action.payload };
        }
    }
    return state;
}