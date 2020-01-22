const logger = store => next => action => {
  console.group(action.type);
  console.log('dispatching: ', action);
  const result = next(action);
  // at this point, action is sent to the reducer
  // logs from here on is after the store is updated

  console.log('next state: ', store.getState()) // we have this bc store is passed on
  console.groupEnd(action.type)

  return result;
}

export default logger;
