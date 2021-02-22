import { SET_COUNTRIES } from "../actionTypes";

const DEFAULT_STATE = {
  loading: true,
  countries: [],
  // loading: true
};

export default (state = DEFAULT_STATE, action) => {
  const { type, countries } = action;
  switch (type) {
    case SET_COUNTRIES:
      return {
        loading: false,
        countries: countries,
      };

    default:
      return state;
  }
};
