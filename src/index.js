import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import tasks from './reducers';
import './index.css';

import { devToolsEnhancer } from 'redux-devtools-extension';

import * as serviceWorker from './serviceWorker';

const store = createStore(tasks, devToolsEnhancer());   //pass in the reducer to the store
//passing in enhancer


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
