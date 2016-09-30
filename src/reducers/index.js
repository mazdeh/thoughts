import { combineReducers } from 'redux';
import thoughts from './thoughts';
import user from './user';
import profile from './profile';
import auth from './auth';

export default combineReducers({
  auth,
  user: combineReducers({
    profile,
    thoughts
  })
});
