import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import SnackBarProvider from 'react-simple-snackbar';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackBarProvider>
        <App browserHistory={browserHistory} />
      </SnackBarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
