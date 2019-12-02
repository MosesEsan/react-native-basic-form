// ACTIONS
export const CLEAR_STATE = 'CLEAR_STATE';
export const TEXT_CHANGE = 'TEXT_CHANGE';
export const SET_ERROR = 'SET_ERROR';

// REDUCER
const reducer = (state, action) => {
    switch (action.type) {
        case TEXT_CHANGE: {
            return {...state, [action.name]: action.text};
        }

        case SET_ERROR: {
            return {...state, error: action.error};
        }

        case CLEAR_STATE: {
            return {...state, ...action.state};
        }

        default:
            return state;
    }
};

export default reducer;