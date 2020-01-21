import { uniqueId } from '../actions';


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

//action creator takes in -> 1. state 2. action
export default function tasks(state = { tasks: mockTasks }, action) {
  if (action.type == 'CREATE_TASK') {
    return { tasks: state.tasks.concat(action.payload) }
  }
  if (action.type == 'EDIT_TASK') {
    //destructure && payload has keys of id and params
    const { payload } = action;
    return {
      tasks: state.tasks.map(task => {
        if(task.id == payload.id) {
          //returning a new copy, not modifying the original object
          return Object.assign({}, task, payload.params);
        }

        //handle the remainder
        return task;
      })
    }
  }

  return state;   //not doing anything with action rn
}
