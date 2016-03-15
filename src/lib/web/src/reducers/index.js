import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import session from './session';

const rapidApp = combineReducers({
  routing: routerReducer,
  session
});

export default rapidApp;
