// src/ducks/auth.js
export const types = {
  AUTO_LOGIN: "AUTH/AUTH_AUTO_LOGIN",
  LOGIN_REQUEST: "AUTH/LOGIN_REQUEST",
  LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  LOGIN_FAILURE: "AUTH/LOGIN_FAILURE",
  LOGOUT: "AUTH/LOGOUT",
};

export const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case types.LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.user };

    case types.LOGIN_FAILURE:
      return { ...state, isLoading: false, error: action.error };

    case types.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

export const actions = {
  login: (email, password) => ({
    type: actionTypes.LOGIN_REQUEST,
    email,
    password,
  }),
  logout: () => ({ type: actionTypes.LOGOUT }),
};
