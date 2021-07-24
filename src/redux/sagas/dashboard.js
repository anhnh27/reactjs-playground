import { put, call, takeEvery } from 'redux-saga/effects';
import * as Constants from '../../constants';
import * as Actions from '../actions';
import { getToken } from '../../utils/useToken';

async function fetchDashboard() {
    const token = getToken();
    try {
        let response = await fetch(Constants.DASHBOARD_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.token}`
            },
            credentials: 'include'
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

function* dashboardSaga(action) {
    const { data, ex } = yield call(fetchDashboard);
    if (data)
        yield put({ type: Actions.FETCH_DASHBOARD_SUCCESS, data });
    else
        yield put({ type: Actions.FETCH_DASHBOARD_FAILURE, error: ex });
}

export default function* watchDashboard() {
    yield takeEvery(Actions.FETCH_DASHBOARD, dashboardSaga);
}