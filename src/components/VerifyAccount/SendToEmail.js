import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { acceptedEmail } from "../../helpers/FormValidation";
import Invalid from "../ErrorMessages/Invalid";
import { loginUser } from "../../store/actions/auth";
import {
  verifyByOtherEmail,
  sendOtpToEmail,
  sendOtpToMobile,
} from "../../store/actions/auth";
import setAlert from "../../store/actions/alert";
// import { Firebase }                             from '../../helpers/firebaseConfig';
import "../AuthForm/AuthForm.css";
// import VerifyMessage from '../VerifyMessage/VerifyMessage';

//CONST MAYBE HANDLE BY ANOTHER EMAIL TO RESET ALL THE STATE
const SendToEmail = ({
  userData,
  verifyByOtherEmail,
  sendOtpToEmail,
  history,
  location,
}) => {
  const [email, setEmail] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(false);
  };

  const handleSendOtpByEmail = (e) => {
    e.preventDefault();
    if (!acceptedEmail(email)) {
      setError(true);
      return;
    }
    // console.log(email)
    sendOtpToEmail(email, userData.uuid)
      .then((res) => {
        history.push({
          pathname: "/check-email-otp",
          state: { otp: res.data.otp, email: email, originalEmail: false },
        });
      })
      .catch((err) => {
        console.log(err);
        /* DO SOMETHING */
      });
  };

  return actionLoading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <div className="auth-form-layout">
        <header className="form-header">
          <h4 className="form-title">
            <h2>Add email address</h2>
          </h4>
          <p className="form-header-text light-text">
            Confirm your account using your email address
          </p>
        </header>
        <hr className="form-header-separation"></hr>

        <div className="formInput">
          <div className="signup-input-row">
            <label className="form-text">
              Email<span>&#42;</span>
            </label>
            <input
              className={
                error ? "signup-form-input-bar-error" : "signup-form-input-bar"
              }
              type="text"
              name="registered"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            <Invalid field={"Email"} display={error} />
          </div>
          <div className="submit-button-container last-form-button">
            <button
              onClick={handleSendOtpByEmail}
              className="btn btn-lg submit-button formButton"
              type="submit"
            >
              NEXT
            </button>
          </div>
          <div className="form-button-container form-button-container last-form-button">
            <Link
              to={{
                pathname: "/confirm-by-number",
                state: { from: location.pathname },
              }}
              className="btn btn-lg btn-block form-button-secondary"
            >
              Add another Number
            </Link>
          </div>

          <div className="text-center form-end-question-link-container">
            <Link
              to={"/logout"}
              className="form-text-lighter form-end-question-link"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { sendOtpToEmail })(SendToEmail);
