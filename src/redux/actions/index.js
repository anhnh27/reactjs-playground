const TASKS_REFRESH = 'TASKS_REFRESH';
const DASHBOARD_REFRESH = 'DASHBOARD_REFRESH';

const FETCH_DASHBOARD = 'FETCH_DASHBOARD';
const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
const FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE';

const fetchDashboard = (payload) => {
    return {
        type: FETCH_DASHBOARD,
        payload
    }
}

const FETCH_TASKS = 'FETCH_TASKS';
const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

const fetchTasks = (payload) => {
    return {
        type: FETCH_TASKS,
        payload
    }
}

const SEARCH_TASKS = 'SEARCH_TASKS';

const searchTasks = (payload) => {
    return {
        type: SEARCH_TASKS,
        payload
    }
}

const ADD_TASK = 'ADD_TASK';
const ADD_TASK_SUCCESS = 'ADD_TASK_SUCCESS';
const ADD_TASK_FAILURE = 'ADD_TASK_FAILURE';

const addTask = (payload) => {
    return {
        type: ADD_TASK,
        payload
    }
}

const EDIT_TASK = 'EDIT_TASK';
const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';

const editTask = (payload) => {
    return {
        type: EDIT_TASK,
        payload
    }
}

const DELETE_TASK = 'DELETE_TASK';
const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

const deleteTask = (payload) => {
    return {
        type: DELETE_TASK,
        payload
    }
}

export {
    TASKS_REFRESH,
    DASHBOARD_REFRESH,

    FETCH_DASHBOARD,
    FETCH_DASHBOARD_SUCCESS,
    FETCH_DASHBOARD_FAILURE,
    fetchDashboard,

    SEARCH_TASKS,
    searchTasks,

    FETCH_TASKS,
    FETCH_TASKS_FAILURE,
    FETCH_TASKS_SUCCESS,
    fetchTasks,

    ADD_TASK,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
    addTask,

    EDIT_TASK,
    EDIT_TASK_SUCCESS,
    EDIT_TASK_FAILURE,
    editTask,

    DELETE_TASK,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAILURE,
    deleteTask,
}