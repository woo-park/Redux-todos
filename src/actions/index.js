import axios from 'axios';
import * as api from '../api';

import { CALL_API } from '../Middleware/api';

//defines three constants for each action dispatched within fetchTasks
export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';


// this approach === instead of handling in action creators, you handle in middleware
// you are returning an object with key 'CALL_API' -> types and endpoint <= this whole object is action object from middlware point of view
export function fetchTasks() {
  return {
    [CALL_API]: {
      types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
      endpoint: '/tasks',
    }
  }
}

//defines three constants for each action dispatched within fetchTasks
export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED';
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED';
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED';


// this approach === instead of handling in action creators, you handle in middleware
// you are returning an object with key 'CALL_API' -> types and endpoint <= this whole object is action object from middlware point of view
export function createTask({ title, description, status = 'Unstarted' }) {
  return {
    [CALL_API]: {
      types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
      endpoint: '/tasks',
      method: 'POST',
      body: {
        title: title,
        description: description,
        status: status,
      },
    }
  }
}





let _id = 1;
export function uniqueId() {
  return _id++;
}

function createTaskSucceeded(task) {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task: task,
    },
  }
}

function editTaskSucceeded(task) {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task:task,
    },
  }
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

export function fetchTaskSuceeded(tasks) {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks: tasks,
    }
  }
}

function fetchTasksStarted() {
  return {
    type: 'FETCH_TASKS_STARTED',
  }
}

function fetchTasksFailed(error) {
  return {
    type: 'FETCH_TASKS_FAILED',
    payload: {
      error: error
    }
  }
}

// export function fetchTasks() {
//   return dispatch => {
//     dispatch(fetchTasksStarted());
//
//     api.fetchTasks()
//       .then(resp => {
//         setTimeout(()=>{
//           dispatch(fetchTaskSuceeded(resp.data))
//         }, 2000)
//
//         // for practice
//         // throw new Error('Oh noes! unable to fetch');
//       })
//       .catch(err => {   //wonder how err object looks like
//         dispatch(fetchTasksFailed(err.message))
//       })
//
//   }
// }








// previous implementations

/*
export function fetchTasks() {
  return dispatch => {
    // used to be like this until we imported * as api
    // axios.get('http://localhost:3001/tasks')
    api.fetchTasks().then(resp => {
        dispatch(fetchTaskSuceeded(resp.data))
      });
  }
}
*/


// exporting action creator -> that returns action objects
// export function createTask({ title, description, status = "Unstarted" }) { //destructure passed in object from App.js
//   /*
//   return {
//     type: 'CREATE_TASK',
//     payload: {
//       id: uniqueId(),
//       title: title,
//       description: description,
//       status: 'Unstarted',    //unstarted default to begin with
//     }
//   }
//   */
//   return dispatch => {
//     api.createTask({ title, description, status }).then(resp => {
//       dispatch(createTaskSucceeded(resp.data)); //check why its resp.data
//     });
//   }
// }


//synchronous action creator -> pure function
export function editTask(id, params = {}) {
  /*
  return {
    type: 'EDIT_TASK',
    payload: {
      id: id,
      params: params
    }
  };
  */
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);
    //merges the new properties into the existing task object

    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
    })
  }
}
