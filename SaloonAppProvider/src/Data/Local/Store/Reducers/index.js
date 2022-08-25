import {combineReducers} from 'redux';
import authReducer from './AuthReducer';

var reducers = combineReducers({
    authReducer
  });
  
  export default rootReducer = (state, action) => {

    return reducers(state, action);
  };