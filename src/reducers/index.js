import { combineReducers } from 'redux';
import thoughts from './thoughts';
import user from './user';

export default combineReducers({
  user,
  thoughts
});
