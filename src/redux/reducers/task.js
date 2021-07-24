import * as Actions from '../actions';

const initialState = {
    loading: false,
    data: null,
    error: null,
}
const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.ADD_TASK:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case Actions.ADD_TASK_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: null,
            }
        case Actions.ADD_TASK_FAILURE:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.error
            }
        case Actions.EDIT_TASK:
            return {
                ...state,
                id: action.payload.id,
                loading: true,
                error: null,
            }
        case Actions.EDIT_TASK_SUCCESS:
            return {
                ...state,
                id: null,
                data: action.data,
                loading: false,
                error: null,
            }
        case Actions.EDIT_TASK_FAILURE:
            return {
                ...state,
                id: null,
                data: null,
                loading: false,
                error: action.error
            }
        case Actions.DELETE_TASK:
            return {
                ...state,
                id: action.payload.id,
                loading: true,
                error: null,
            }
        case Actions.DELETE_TASK_SUCCESS:
            return {
                ...state,
                id: null,
                data: action.data,
                loading: false,
                error: null,
            }
        case Actions.DELETE_TASK_FAILURE:
            return {
                ...state,
                id: null,
                data: null,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default taskReducer;