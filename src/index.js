import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import tasks from './reducers';//might be {}
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension';

import * as serviceWorker from './serviceWorker';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasks(state.tasks, action),
  }
}

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);   //pass in the reducer to the store
//passing in enhancer

//devToolsEnhancer()


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
