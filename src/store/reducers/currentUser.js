import { SET_CURRENT_USER, SET_SESSION } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
  inSession: false,
  // loading: true
};

export default (state = DEFAULT_STATE, action) => {
  const { type, user, message } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        user: user,
        isAuthenticated:
          user.emailVerified === true || user.mobileVerified === true,
      };
    case SET_SESSION:
      return {
        ...state,
        inSession: true,
      };
    default:
      return state;
  }
};
