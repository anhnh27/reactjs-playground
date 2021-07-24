import { all } from 'redux-saga/effects';
import watchDashboard from './dashboard';
import watchTask from './task';
import watchTaskList from './taskList';

export default function* rootSaga() {
    yield all([
        watchDashboard(),
        watchTask(),
        watchTaskList()
    ])
}