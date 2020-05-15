import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter  } from 'react-router-dom'
import App from './App';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import store from './redux/store.js';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter history={history} >
    <App history={history} />
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
