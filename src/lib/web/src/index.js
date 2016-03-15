import { render } from 'react-dom';
import { Router, Route, DefaultRoute, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

import rapidApp from './reducers';

import App from './containers/app';
import LoginPage from './containers/LoginPage';
import LandingPage from './containers/LandingPage';
import requireAuthentication from './containers/authenticatedComponent';

const logger = createLogger();
const devMode = (process.env.NODE_ENV !== 'production');
let middleware = [
  thunk,
  promise,
  routerMiddleware(browserHistory)
];

// If this is not production and the user does *not* have redux devtools,
// add the console logger middleware.
// If redux devtools are installed, they'll be added when the store is created.
if (devMode && (!window.devToolsExtension)) {
  middleware.push(logger);
}

const store = createStore(
  rapidApp,
  (window.devToolsExtension && devMode) ? window.devToolsExtension() : f => f,
  applyMiddleware(...middleware)
);


// const requireAuth = (nextState, replace, callback) => {
//   debugger;
// };

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={requireAuthentication(LandingPage)} />
          <Route path="login" component={LoginPage}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
);
