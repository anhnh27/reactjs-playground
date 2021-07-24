import { combineReducers } from 'redux';
import dashboardReducer from './dashboard';
import taskReducer from './task';
import taskListReducer from './taskList';

const rootReducer = combineReducers({
    dashboardReducer,
    taskReducer,
    taskListReducer
});

export default rootReducer;