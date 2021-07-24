import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as Constants from '../../constants';
import * as Actions from '../actions';

const addTask = async (task) => {
    try {
        let response = await fetch(Constants.TASK_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(task)
        });
        let json = await response.json();
        task.id = json.insertId
        return {
            data: task,
        };
    } catch (ex) {
        return {
            data: null,
            ex
        };
    }
}

function* taskSaga(action) {
    const { data, ex } = yield call(addTask, action.payload);
    if (data) {
        yield put({ type: Actions.ADD_TASK_SUCCESS, data });
        yield put({ type: Actions.TASKS_REFRESH, data: { operation: 'add', task: data } });
        yield put({ type: Actions.DASHBOARD_REFRESH, data: { operation: 'add', task: data } });
    }
    else
        yield put({ type: Actions.ADD_TASK_FAILURE, error: ex });
}

const editTask = async (task) => {
    try {
        let response = await fetch(`${Constants.TASK_URL}/${task.id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(task)
        });
        await response.json();
        return {
            data: task,
        };
    } catch (ex) {
        return {
            data: null,
            ex
        };
    }
}

function* editTaskSaga(action) {
    const { data, ex } = yield call(editTask, action.payload);
    if (data) {
        yield put({ type: Actions.EDIT_TASK_SUCCESS, data });
        yield put({ type: Actions.TASKS_REFRESH, data: { operation: 'edit', task: data } });
        yield put({ type: Actions.DASHBOARD_REFRESH, data: { operation: 'edit', task: data, isChangeStatus: action.payload.isChangeStatus } });
    }
    else
        yield put({ type: Actions.EDIT_TASK_FAILURE, error: ex });
}

const deleteTask = async (id) => {
    try {
        let response = await fetch(`${Constants.TASK_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            credentials: 'include',
        });
        let json = await response.json();
        return {
            data: json,
        };
    } catch (ex) {
        return {
            data: null,
            ex
        };
    }
}

function* deleteTaskSaga(action) {
    const { data, ex } = yield call(deleteTask, action.payload);
    if (data) {
        yield put({ type: Actions.DELETE_TASK_SUCCESS, data });
        yield put({ type: Actions.TASKS_REFRESH, data: { operation: 'delete', id: action.payload } });
    }
    else
        yield put({ type: Actions.DELETE_TASK_FAILURE, error: ex });
}

export default function* watchTask() {
    yield takeLatest(Actions.ADD_TASK, taskSaga);
    yield takeEvery(Actions.EDIT_TASK, editTaskSaga);
    yield takeEvery(Actions.DELETE_TASK, deleteTaskSaga);
}