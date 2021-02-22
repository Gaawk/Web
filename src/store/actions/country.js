import axiosInstance from "../../helpers/api";
import { SET_COUNTRIES } from "../actionTypes";
import setAlert from "./alert";
import axios from "axios";

export function setCountries(countries) {
  return {
    type: SET_COUNTRIES,
    countries,
  };
}

export function getCountries() {
  return (dispatch) => {
    return axiosInstance
      .get("/country")
      .then((res) => {
        console.log(res);
        dispatch(setCountries(res));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
