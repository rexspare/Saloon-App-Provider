import AsyncStorage from "@react-native-async-storage/async-storage";
import Types from '../Contants'

var defaultState = {
  user: {},
  findingUser: true,
  isUserLoggedIn: false,
  categories: [],
  mylocaton: {},
  reviews : [],
  todaysBooking :[],
  allPendingOrders : []
};


var authReducer = (state = defaultState, action) => {
  switch (action.type) {

    case Types.USER_INFO: {
      let newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    }

    case Types.IS_USER_LOGGED_IN: {
      let newState = Object.assign({}, state);
      newState.isUserLoggedIn = action.payload;
      return newState;
    }

    case Types.CATEGORIES: {
      let newState = Object.assign({}, state);
      newState.categories = action.payload;
      return newState;
    }

    case Types.CATEGORIES: {
      let newState = Object.assign({}, state);
      newState.mylocaton = action.payload;
      return newState;
    }

    case Types.REVIEWS: {
      let newState = Object.assign({}, state);
      newState.reviews = action.payload;
      return newState;
    }

    case Types.TODAYS_BOOKING: {
      let newState = Object.assign({}, state);
      newState.todaysBooking = action.payload;
      return newState;
    }

    case Types.ALL_PENDING_ORDERS: {
      let newState = Object.assign({}, state);
      newState.allPendingOrders = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
export default authReducer;