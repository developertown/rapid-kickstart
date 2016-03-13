import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './containers/App';
import LoginPage from './containers/LoginPage';
import LandingPage from './containers/LandingPage';

render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage}/>
        <Route path="/login" component={LoginPage}/>
      </Route>
    </Router>,
    document.getElementById('app')
);
