import React, { Fragment, useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginUser } from "../../store/actions/auth";
import {
  verifyByNumber,
  sendOtpToMobile,
  sendOtpToEmail,
} from "../../store/actions/auth";
import setAlert from "../../store/actions/alert";
import Required from "../ErrorMessages/Required";
import Invalid from "../ErrorMessages/Invalid";
import DontMatch from "../ErrorMessages/DontMatch";
import { isNumber, isEmptyField } from "../../helpers/FormValidation";
import { v4 as uuidv4 } from "uuid";

import "../AuthForm/AuthForm.css";
import currentUser from "../../store/reducers/currentUser";
//CONST MAYBE HANDLE BY ANOTHER NUMBER TO RESET ALL THE STATE

const OtpToMobile = ({
  userData,
  verifyByNumber,
  verifyByEmail,
  sendOtpToMobile,
  sendOtpToEmail,
  setAlert,
  history,
  location,
}) => {
  // console.log(location.state)

  const sentOtp = location.state.otp;
  const number = location.state.number;
  const code = location.state.code;

  const [expiresIn, setExpiresIn] = useState(40);
  const [showOtpOptions, setShowOtpOtions] = useState(false);
  const [expired, setExpired] = useState(false);
  const [otp, setOTP] = useState("");
  const [resentOtp, setResentOtp] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState({
    otpRequired: false,
    invalidOtp: false,
    otpsDontMatch: false,
    expired: false,
  });

  const pageReloaded = () => {
    localStorage.setItem("page-reloaded", "true");
  };
  //remove page-reload from localstorage
  const clearReloadFlag = () => {
    localStorage.removeItem("page-reloaded");
  };
  useEffect(() => {
    // console.log('first effect in otp')
    if (localStorage.getItem("page-reloaded") === "true") {
      setExpiresIn(0);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("beforeunload", pageReloaded);
    return () => {
      window.removeEventListener("beforeunload", pageReloaded);
      // console.log('removed')
    };
  }, []);

  useEffect(() => {
    var seconds = expiresIn;
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setExpiresIn(seconds - 1);
      } else {
        setExpired(true);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [expiresIn]);

  const handleOtpChange = (e, index) => {
    // console.log(e.target.value)
    setError({
      otpRequired: false,
      invalidOtp: false,
      otpsDontMatch: false,
      expired: false,
    });

    setOTP(e.target.value);
  };

  const handleSendAgain = () => {
    // THIS IS JUST UNTIL ISSUE WITH COUNTRY CODE IS FIXED ON THE BACK END
    const fullNumber = code.concat(number);
    clearReloadFlag();
    setExpired(false);
    sendOtpToMobile(fullNumber, userData.uuid)
      .then((res) => {
        setExpiresIn(40);
        setResentOtp(res.data.otp);
      })
      .catch((err) => {
        console.log(err);
        /* HANDLE ERROR */
      });
  };

  const handleConfirmByEmail = () => {
    setActionLoading(true);
    clearReloadFlag();
    sendOtpToEmail(userData.email, userData.uuid)
      .then((res) => {
        setActionLoading(false);
        history.push({
          pathname: "/check-email-otp",
          state: {
            otp: res.data.otp,
            email: userData.email,
            originalEmail: true,
          },
        });
      })
      .catch((err) => {
        setActionLoading(false);
        console.log(err);
        /* DO SOMETHING */
      });
  };

  const handleCompareOtp = (e) => {
    // console.log(resentOtp)//DISPLAYING RESENT OTP

    const otpToCompare = resentOtp === "" ? sentOtp : resentOtp;
    if (
      isEmptyField(otp) ||
      otpToCompare !== otp ||
      expired === true ||
      !isNumber(otp)
    ) {
      //
      if (isEmptyField(otp)) {
        setError({
          ...error,
          otpRequired: isEmptyField(otp),
        });
        return;
      }
      if (!isNumber(otp)) {
        setError({
          error,
          invalidOtp: !isNumber(otp),
        });
      }
      if (otpToCompare !== otp || expired === true) {
        setError({
          ...error,
          otpsDontMatch: otpToCompare !== otp,
          expired: expired,
        });
        return;
      }

      return;
    }

    clearReloadFlag();
    setActionLoading(true);
    verifyByNumber(code, number, userData.uuid)
      .then((res) => {
        // handleClearSessionFromStorage()
        setActionLoading(false);
        console.log("CORRECT OTP BY NUMBER");
        history.push("/userpage");
      })
      .catch((err) => {
        setActionLoading(false);
        console.log(err);
        /*HANDLE ERROR */
      });
  };

  return actionLoading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <div className="auth-form-layout">
        <header className="form-header">
          <h2 className="form-title">Confirm your account </h2>
          <p className="form-header-text light-text">
            {" "}
            We have sent you an SMS message with a code to {code} {number}
            <span className="d-block form-header-text light-text">
              {" "}
              Please enter the 6 digit code from the SMS below{" "}
            </span>
          </p>
        </header>
        <hr className="form-header-separation"></hr>
        <div className="formInput">
          <div className="signup-input-row">
            <label className="form-text">
              Code <span>&#42;</span>
            </label>

            <input
              className={
                error.invalidOtp ||
                error.otpRequired ||
                error.otpsDontMatch ||
                error.expired
                  ? "otp-input signup-form-input-bar-error"
                  : "otp-input signup-form-input-bar"
              }
              type="text"
              name="code"
              value={otp}
              onChange={(e) => handleOtpChange(e)}
            />
            <Invalid field={"OTP"} display={error.invalidOtp} />
            <Required field={"OTP"} display={error.otpRequired} />
            <DontMatch
              field={"OTP"}
              display={error.otpsDontMatch || error.expired}
            />
          </div>

          <div className="submit-button-container">
            <button
              onClick={handleCompareOtp}
              className="btn btn-lg submit-button formButton"
              type="submit"
            >
              Confirm
            </button>
          </div>
          <div className="form-button-container">
            <button
              onClick={() => setShowOtpOtions(!showOtpOptions)}
              className="i-did-not-get-otp"
            >
              I didn't recieve the code
            </button>
          </div>

          <div className="form-button-container">
            <button
              onClick={handleConfirmByEmail}
              className={
                showOtpOptions
                  ? "btn btn-lg btn-block form-button-secondary show-otp-options"
                  : "btn btn-lg btn-block form-button-secondary hide-otp-options"
              }
            >
              Confirm by email
            </button>
          </div>

          <div className="form-button-container">
            <Link
              to={{
                pathname: "/confirm-by-number",
                state: { from: location.pathname },
              }}
              className={
                showOtpOptions
                  ? "btn btn-lg btn-block form-button-secondary show-otp-options"
                  : "btn btn-lg btn-block form-button-secondary hide-otp-options"
              }
            >
              Add another number
            </Link>
          </div>
          <div className="form-button-container">
            <button
              onClick={handleSendAgain}
              className={
                showOtpOptions
                  ? "btn btn-lg btn-block form-button-secondary last-form-button show-otp-options"
                  : "btn btn-lg btn-block form-button-secondary hide-otp-options last-form-button "
              }
              disabled={!expired}
            >
              Send code again <span>{expiresIn > 0 && `(${expiresIn})`}</span>
            </button>
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

export default connect(null, {
  verifyByNumber,
  sendOtpToMobile,
  sendOtpToEmail,
  setAlert,
})(OtpToMobile);
