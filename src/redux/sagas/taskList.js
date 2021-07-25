import { put, call, takeLatest } from 'redux-saga/effects';
import * as Constants from '../../constants';
import * as Actions from '../actions';
import { getToken } from '../../utils/useToken';

const getTasks = async () => {
    const { token } = getToken();
    try {
        let response = await fetch(Constants.TASK_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
        let data = await response.json();
        return {
            data,
        };
    } catch (ex) {
        return {
            data: null,
            ex
        };
    }
}

function* taskListSaga() {
    const { data, ex } = yield call(getTasks);
    if (data)
        yield put({ type: Actions.FETCH_TASKS_SUCCESS, data });
    else
        yield put({ type: Actions.FETCH_TASKS_FAILURE, error: ex });
}

const searchTasks = async (keyword) => {
    const { token } = getToken();
    try {
        let response = await fetch(`${Constants.TASK_URL}?keyword=${keyword}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
        });
        let data = await response.json();
        return {
            data,
        };
    } catch (ex) {
        return {
            data: null,
            ex
        };
    }
}

function* searchTasksSaga(action) {
    const { data, ex } = yield call(searchTasks, action.payload);
    if (data)
        yield put({ type: Actions.FETCH_TASKS_SUCCESS, data });
    else
        yield put({ type: Actions.FETCH_TASKS_FAILURE, error: ex });
}

export default function* watchTaskList() {
    yield takeLatest(Actions.FETCH_TASKS, taskListSaga);
    yield takeLatest(Actions.SEARCH_TASKS, searchTasksSaga);
}