import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import promise from 'redux-promise-middleware'
import { createLogger as logger } from 'redux-logger'
import { BrowserRouter } from 'react-router-dom';


const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
  registerServiceWorker();
