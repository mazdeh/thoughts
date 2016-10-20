import { combineReducers } from 'redux';
import thoughts from './thoughts';
import profile from './profile';
import auth from './auth';

export default combineReducers({
  user: combineReducers({
    profile,
    thoughts
  })
});
