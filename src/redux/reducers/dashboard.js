import * as Actions from '../actions';

const initialState = {
    loading: true,
    data: null,
    error: null,
}
const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.FETCH_DASHBOARD:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case Actions.FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: null,
            }
        case Actions.FETCH_DASHBOARD_FAILURE:
            return {
                ...state,
                data: null,
                loading: false,
                error: action.error
            }
        case Actions.DASHBOARD_REFRESH:
            let newData;
            switch (action.data.operation) {
                case 'add': {
                    let newLatestTasks = [...state.data.latestTasks];
                    newLatestTasks.pop();
                    newLatestTasks = [action.data.task, ...newLatestTasks];
                    newData = {
                        ...state.data,
                        totalTasks: state.data.totalTasks + 1,
                        latestTasks: newLatestTasks
                    }
                    break;
                }
                case 'edit': {
                    let isCompleted = 0;
                    if (action.data.isChangeStatus) {
                        isCompleted = action.data.task.done ? 1 : -1;
                    }
                    let foundIndex = state.data.latestTasks.findIndex(x => x.id === action.data.task.id);
                    let newLatestTask = [...state.data.latestTasks];
                    newLatestTask[foundIndex] = action.data.task;
                    newData = {
                        ...state.data,
                        completedTasks: state.data.completedTasks + isCompleted,
                        latestTasks: newLatestTask
                    }
                    break;
                }
                default:
                    break;
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

export default dashboardReducer;