import { combineReducers } from 'redux';
import thoughts from './thoughts';
import user from './user';
import auth from './auth';

export default combineReducers({
  auth,
  user,
  thoughts,
});
