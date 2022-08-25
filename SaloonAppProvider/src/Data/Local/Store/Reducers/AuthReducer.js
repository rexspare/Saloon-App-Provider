import AsyncStorage from "@react-native-async-storage/async-storage";
import Types from'../Contants'

var defaultState = {
    user: {},
    findingUser : true,
  };

  
var authReducer = (state = defaultState, action) => {
    switch (action.type) {

      case Types.USER_INFO: {
        let newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      }
  
      default:
        return state;
    }
  };
  export default authReducer;