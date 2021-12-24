import {
  AUTHENTICATION_PROGRESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  REFRESH_ERROR,
  SIGNUP_FAIL,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SUCCESS_AUTHENTICATE,
} from "../actions/actionType";

const initialAuthState = {
  user: {},
  error: null,
  successMessage: null,
  isLoggedIn: null,
  inProgress: null,
  authProgress: false,
};
export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
        error: null,
        successMessage: null,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.error,
        inProgress: false,
        successMessage: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        inProgress: false,
        successMessage: action.successMessage,
        error: null,
      };

    case SUCCESS_AUTHENTICATE:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        error: null,
        inProgress: false,
        authProgress: false,
      };

    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        authProgress: false,
      };
    case AUTHENTICATION_PROGRESS:
      return {
        ...state,
        authProgress: true,
      };
    case REFRESH_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
