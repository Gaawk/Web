import axiosInstance from "../../helpers/api";
import { SET_CURRENT_USER, VERIFY_EMAIL } from "../actionTypes";
import setAlert from "./alert";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("currentUser");
    sessionStorage.clear();

    dispatch(setCurrentUser({}));
  };
}

export function loginUser(fcmToken, email, password, keepLoggedIn) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const path = `/users/login?fcmToken=${fcmToken}&login=${email}&password=${password}`;

      return axiosInstance
        .get(path)
        .then((res) => {
          console.log(res.data);
          // localStorage.setItem("loggedIn", "false");
          sessionStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("keepLoggedIn", keepLoggedIn ? "true" : "false");
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          localStorage.setItem("userId", res.data.uuid);
          dispatch(setCurrentUser(res.data));
          resolve(res);
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          reject(err);
        });
    });
  };
}

export function registerUser(data) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return axiosInstance
        .post("/users/register", JSON.stringify(data))
        .then((res) => {
          console.log(res.data);
          dispatch(setCurrentUser(res.data));
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          localStorage.setItem("userId", res.data.uuid);
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };
}

export function sendOtpToEmail(email, userId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const path = `/users/sendOTP?email=${email}`;

      return axiosInstance
        .get(path)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  };
}

export function sendOtpToMobile(number, userId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const path = `/users/sendOTP?mobile=${number}`;

      return axiosInstance
        .get(path)
        .then((res) => {
          console.log(JSON.stringify(res) + " OTP");
          resolve(res);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  };
}
export function verifyByEmail(userId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const path = "/users/login/verifyEmail";

      return axiosInstance
        .get(path)
        .then((user) => {
          dispatch(setCurrentUser(user.data));
          resolve(user);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  };
}

export function verifyByOtherEmail(email, userId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const path = `/users/login/updateEmail?email=${email}`;
      return axiosInstance
        .get(path)
        .then((user) => {
          dispatch(setCurrentUser(user.data));
          resolve(user);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  };
}

export function verifyByNumber(code, number, userId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // var fullNumber=code.concat(number)
      const path = `/users/login/updateMobile?countryCode=${code}&mobile=${number}`;
      return axiosInstance
        .get(path)
        .then((user) => {
          dispatch(setCurrentUser(user.data));
          resolve(user);
        })
        .catch((err) => {
          console.log(err.response);
          reject(err);
        });
    });
  };
}
