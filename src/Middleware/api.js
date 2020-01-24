import axios from 'axios';

export const CALL_API = 'CALL_API';

const API_BASE_URL = 'http://localhost:3001';

function makeCall({endpoint, method = 'GET', body}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const params = {
    method: method,
    url: url,
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  return axios(params).then(resp => resp).catch(err => err);
  // return axios
  //     .get(url)
  //     .then(resp => {
  //       return resp;
  //     })
  //     .catch(err => {
  //       return err;
  //     });
}

const apiMiddleware = store => next => action => {
  const callApi = action[CALL_API];   //the object returned from fetchTasks() action creator
  if (typeof callApi === 'undefined') {
    return next(action);
  }

  const [requestStartedType, successType, failureType] = callApi.types;   //destructures each action type

  //next will ultimately dispatch an action to the store
  next({ type: requestStartedType });
  //You've already dispatched the action to indicate the request has started

  return makeCall({
    method: callApi.method,
    body: callApi.body,
    endpoint: callApi.endpoint,
  })
  .then(response => next({
    type: successType,
    payload: response.data,
  }))
  .catch(error => next({
    type: failureType,
    error: error.message,
  }));

  // return makeCall(callApi.endpoint)
  //   .then(response => next({
  //     type: successType,
  //     payload: response.data,
  //   }))
  //   .catch(error => next({
  //     type: failureType,
  //     error: error.message,
  //   }))

}



export default apiMiddleware;
