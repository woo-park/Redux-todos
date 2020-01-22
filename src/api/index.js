import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// axios.create takes in an object with baseURL and headers
const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function fetchTasks() {
  return client.get('/tasks');
}

export function createTask(params) {
  return client.post('/tasks', params);
}

export function editTask(id, params) {
  return client.put(`${API_BASE_URL}/tasks/${id}`, params)
}



// this file, later, will be imported as 'api' -> using this syntax -> api.fetchTasks();
