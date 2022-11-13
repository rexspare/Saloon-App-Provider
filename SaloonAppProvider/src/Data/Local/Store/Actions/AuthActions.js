import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROUTES } from "../../../remote/Routes";
import apiRequest from "../../../remote/Webhandler";
import Types from '../Contants'
import { showFlash } from '../../../../utils/MyUtils'

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const setUser = (data) => async (dispatch) => {
  dispatch({ type: Types.USER_INFO, payload: data });
};

export const setIsUserLoggedIn = (data) => async (dispatch) => {
  dispatch({ type: Types.IS_USER_LOGGED_IN, payload: data });
};

export const setLocation = (data) => async (dispatch) => {
  dispatch({ type: Types.MY_LOCATION, payload: data });
};


export const registerUser = (data, callBack) => async (dispatch) => {
  console.log(data);
  const result = await apiRequest({
    method: "post",
    url: ROUTES.REGISTER,
    data: { ...data },
  }).catch((err) => {
    showFlash("Network Error", "danger", 'auto',)
    return false;
  });
  if (result.data.status) {
    console.log(result.data);
    showFlash(result.data?.message?.replace("\n", ""), 'success', 'none')
    callBack(result)
    return result.data;
  } else {
    showFlash(result.data.message?.replace("\n", ""), 'danger', 'none')
    return result;
  }
};

export const getCategories = () => async (dispatch) => {
  const result = await apiRequest({
    method: "GET",
    url: ROUTES.GET_CATEGORIES,
  }).catch((err) => {
    showFlash("Network Error", "danger", 'auto',)
    return false;
  });
  if (result.data.status) {
    dispatch({ type: Types.CATEGORIES, payload: result?.data?.categories });
    return result.data;
  } else {
    return result;
  }

}

export const getReviews = (user_id) => async (dispatch) => {
  const result = await apiRequest({
    method: "POST",
    url: ROUTES.REVIEWS,
    data: { vendor_id: user_id }
  }).catch((err) => {
    return false;
  });
  if (result.data.status) {
    dispatch({ type: Types.REVIEWS, payload: result.data.reviews });
  } else {
    dispatch({ type: Types.REVIEWS, payload: [] });
    return result;
  }

}

export const getTodaysBooking = (user_id) => async (dispatch) => {
  const result = await apiRequest({
    method: "POST",
    url: ROUTES.TODAYS_BOOKINGS,
    data: { user_id: user_id }
  }).catch((err) => {
    showFlash("Network Error", "danger", 'auto',)
    return false;
  });
  if (result?.data?.status) {
    dispatch({ type: Types.TODAYS_BOOKING, payload: result.data.data });
  } else {
    dispatch({ type: Types.TODAYS_BOOKING, payload: [] });
    return result;
  }

}

export const getPendingBookingHistory = (user_id) => async (dispatch) => {
  const result = await apiRequest({
    method: "POST",
    url: ROUTES.GET_BOOKING_HISTORY,
    data: { user_id: user_id, type: 'vendor', booking_status: 'pending' }
  }).catch((err) => {
    showFlash("Network Error", "danger", 'auto',)
    return false;
  });
  if (result?.data?.status) {
    dispatch({ type: Types.ALL_PENDING_ORDERS, payload: result.data.data});
  } else {
    dispatch({ type: Types.ALL_PENDING_ORDERS, payload: [] });
    return result;
  }

}


