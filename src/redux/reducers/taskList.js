import * as Actions from '../actions';

const initialState = {
    loading: true,
    data: null,
    error: null,
}
const taskListReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.FETCH_TASKS:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case Actions.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: null,
            }
        case Actions.FETCH_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case Actions.TASKS_REFRESH:
            let newData;
            switch (action.data.operation) {
                case 'add': {
                    newData = [...state.data, action.data.task];
                    break;
                }
                case 'edit': {
                    let foundIndex = state.data.findIndex(x => x.id == action.data.task.id);
                    newData = [...state.data];
                    newData[foundIndex] = action.data.task;
                    break;
                }
                case 'delete': {
                    newData = state.data.filter(x => x.id !== action.data.id);
                    break;
                }
            }

            return {
                data: newData,
                loading: false,
                error: null
            }
        default:
            return state;
    }
}

export default taskListReducer;