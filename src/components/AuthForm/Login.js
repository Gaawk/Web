import React, { Fragment, useEffect, useState } from "react";
import { loginUser } from "../../store/actions/auth";
import setAlert from "../../store/actions/alert";
import {
  isEmptyField,
  acceptedEmail,
  acceptedPassword,
} from "../../helpers/FormValidation";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import "./AuthForm.css";

const Login = ({ loginUser, setAlert }) => {
  const history = useHistory();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    keepLoggedIn: false,
    fcmToken: "fcm",
  });
  const [seePassword, setSeePassword] = useState(false);
  // const [actionLoading, setActionLoading]= useState(false)
  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleLogin = () => {
    const { email, password, keepLoggedIn, fcmToken } = formData;
    if (
      acceptedPassword(password) === false ||
      acceptedEmail(email) === false ||
      isEmptyField(email) ||
      isEmptyField(password)
    ) {
      if (isEmptyField(email)) {
        setAlert("Email is required. Please enter your email.", "warning");
        return;
      }
      if (isEmptyField(password)) {
        setAlert("Password is required. Please enter your password", "warning");
        return;
      }
      if (acceptedEmail(email) === false) {
        setAlert("Please enter a valid email format.", "warning");
        return;
      }
      if (acceptedPassword(password) === false) {
        setAlert(
          "A password must be 8 characters Long. It should include atleast 1 number and 1 special character.",
          "warning"
        );
        return;
      }

      return;
    }
    setFormData({ email: "", password: "", keepLoggedIn: false });
    loginUser(fcmToken, email, password, keepLoggedIn)
      .then((res) => {
        if (
          res.data.emailVerified === false &&
          res.data.mobileVerified === false
        ) {
          //    setActionLoading(false)
          history.push({
            pathname: "/confirm-by-number",
            state: { from: location.pathname },
          });
        } else {
          // setActionLoading(false)
          history.push("/userpage");
        }
      })
      .catch((err) => {
        console.log(err);
        // if(err.status===406){
        //     setAlert('This account does not exisit', 'warning')
        // }
      });
  };

  return (
    <div className="row " id="login-form-container">
      <div className="col-5">
        <label>
          Email <span>&#42;</span>
        </label>
        <input
          className="login-form-input-bar w-100"
          type="text"
          name="email"
          value={formData.email}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <div className="col-5">
        <label>
          Password <span>&#42;</span>{" "}
        </label>
        <input
          className="login-form-input-bar w-100 "
          id="password-input-login"
          type={!seePassword ? "password" : "text"}
          name="password"
          value={formData.password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <span
          onClick={() => {
            setSeePassword(!seePassword);
          }}
          className="material-icons light-text position-password"
        >
          {seePassword ? "visibility" : "visibility_off"}
        </span>
      </div>
      <div className="col-2">
        <button
          className="btn "
          id="login-submit-button"
          onClick={(e) => handleLogin(e)}
        >
          Log In
        </button>
      </div>
      <div className="col-12 ">
        <label id="keep-logged-in-label">
          <input
            id="check-input"
            name="keepLoggedIn"
            type="checkbox"
            value={formData.keepLoggedIn}
            onChange={(e) => handleChange(e)}
          />
          <span id="checkmark"></span>
          <span className="light-text text-white" style={{ fontSize: "0.9em" }}>
            {" "}
            Keep me logged in{" "}
          </span>
        </label>
      </div>
    </div>
  );
};

export default connect(null, { loginUser, setAlert })(Login);

{
  /*  */
}
