// src/ducks/auth.js

import { userService } from "services/userService";

/** Actions */
export const actionTypes = {
  AUTO_LOGIN: "AUTH/AUTH_AUTO_LOGIN",
  LOGIN_REQUEST: "AUTH/LOGIN_REQUEST",
  LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",
  LOGOUT: "AUTH/LOGOUT",
};

/** Initial state */
export const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

/** Reducer */
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case actionTypes.LOGIN_SUCCESS:
      console.log(action, "=========");
      return { ...state, isLoading: false, user: action.user };

    case actionTypes.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case actionTypes.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

/** Action creators */
export const actions = {
  login: (email) => login(email),
  autoLogin: () => autoLogin(),
  logout: () => ({ type: actionTypes.LOGOUT }),
};

function login(email) {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
      email,
    });

    try {
      const user = await userService.login(email);
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        user,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        error,
      });
    }
  };
}

function autoLogin() {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
    });

    try {
      const user = await userService.autoLogin();
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        user,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        error,
      });
    }
  };
}
