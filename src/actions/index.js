let _id = 1;
export function uniqueId() {
  return _id++;
}

// exporting action creator -> that returns action objects
export function createTask({ title, description }) { //destructure passed in object from App.js
  return {
    type: 'CREATE_TASK',
    payload: {
      id: uniqueId(),
      title: title,
      description: description,
      status: 'Unstarted',    //unstarted default to begin with
    }
  }

}

//synchronous action creator -> pure function
export function editTask(id, params = {}) {
  return {
    type: 'EDIT_TASK',
    payload: {
      id: id,
      params: params
    }
  };
}
