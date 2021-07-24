const API_BASE_URL = process.env.NODE_ENV === 'production' ? "https://assessment-api-1.herokuapp.com" : "http://localhost:3000";
export const LOGIN_URL = `${API_BASE_URL}/login`;
export const LOGOUT_URL = `${API_BASE_URL}/logout`;
export const DASHBOARD_URL = `${API_BASE_URL}/dashboard`;
export const TASK_URL = `${API_BASE_URL}/tasks`;