import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import charts from './charts';

const rootReducer = combineReducers({
  charts: charts,
  routing: routerReducer
});

export default rootReducer;
