import { uniqueId } from '../actions';

/*
const mockTasks = [
  {
      id: uniqueId(),
      title: 'learn Redux',
      description: 'The store, actions, and reducers, oh my...',
      status: 'In Progress'
  },
  {
      id: uniqueId(),
      title: 'Peace on Earth',
      description: 'Peace of me',
      status: 'In Progress'
  },
]
*/
const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
}

//action creator takes in -> 1. state 2. action
//replace -> state = { tasks: mockTasks } -> []
//replace again -> state = { tasks: [] } -> initialState
export default function tasks(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCEEDED': {
      return {
        ...state,     //adds the previous state
        tasks: action.payload,
        isLoading: false, //not sure why i need to do this here

      }
    }
    case 'FETCH_TASKS_STARTED': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'CREATE_TASK_SUCCEEDED': {
      return {
        ...state,   //isLoading: false
        tasks: state.tasks.concat(action.payload)
      }
    }

    case 'EDIT_TASK_SUCCEEDED': {
      const { payload } = action;
      const nextTasks = state.tasks.map(task => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });

      return {
        ...state,
        tasks: nextTasks,
      };

      /*
      return {
        tasks: state.tasks.map(task => {
          if (task.id === payload.task.id) {
            return payload.task;
          }
          return task;
        }),
      };
      */
    }
    case 'FETCH_TASKS_FAILED': {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    }



    /*

    case 'CREATE_TASK': {
      return { tasks: state.tasks.concat(action.payload) }
    }
    case 'EDIT_TASK': {
      //destructure && payload has keys of id and params
      const { payload } = action;
      return {
        tasks: state.tasks.map(task => {
          if(task.id === payload.id) {
            //returning a new copy, not modifying the original object
            return Object.assign({}, task, payload.params);
          }

          //handle the remainder
          return task;
        })
      }
    }

    */

    default: {
        return state//not doing anything with action rn
    }
  }
}
