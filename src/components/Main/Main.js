import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "../Landing/Landing";
import AuthForm from "../AuthForm/AuthForm1";
import UserPage from "../UserPage/UserPage";
import OtpToMobile from "../VerifyAccount/OtpToMobile";
import OtpToEmail from "../VerifyAccount/OtpToEmail";
import SendToEmail from "../VerifyAccount/SendToEmail";
import SendToNumber from "../VerifyAccount/SendToMobile";
import SendToMobile from "../VerifyAccount/SendToMobile";
import AuthGender from "../AuthForm/AuthGender";
import SelectPassword from "../AuthForm/SelectPassword";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import ProtectedAuthRoutes from "../ProtectedRoutes/ProtectedAuthRoutes";
import ProtectedOTPRoutes from "../ProtectedRoutes/ProtectOTPRoutes";
import { v4 as uuidv4 } from "uuid";
import GaawkHomePage from "../Landing/GaawkHomePage";
import UserHomePage from "../Landing/UserHomePage";

const Main = ({ currentUser }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={(props) =>
          currentUser.isAuthenticated ? (
            <UserHomePage currentUser={currentUser} {...props} />
          ) : (
            <Landing currentUser={currentUser} {...props} />
          )
        }
      />
      {/* ONBOARDING ROUTES */}
      <Route
        exact
        path="/signup/select-gender"
        render={(props) => (
          <AuthGender
            // currentUser={currentUser}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/signup/select-password"
        render={(props) => (
          <SelectPassword
            // currentUser={currentUser}
            {...props}
          />
        )}
      />
      <Route
        exact
        path="/confirm-by-email"
        render={(props) => (
          <SendToEmail userData={currentUser.user} {...props} />
        )}
      />
      <Route
        exact
        path="/confirm-by-number"
        render={(props) => (
          <SendToMobile userData={currentUser.user} {...props} />
        )}
      />
      <Route
        exact
        path="/check-mobile-otp"
        render={(props) => (
          <OtpToMobile userData={currentUser.user} {...props} />
        )}
      />
      <Route
        exact
        path="/check-email-otp"
        render={(props) => (
          <OtpToEmail userData={currentUser.user} {...props} />
        )}
      />
      <ProtectedRoutes exact path="/userpage" component={UserPage} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};
export default connect(mapStateToProps)(Main);

{
  /* <ProtectedAuthRoutes exact path='/signup/select-password' component={AuthGender}/>
			<ProtectedAuthRoutes exact path='/signup/select-gender' component={SelectPassword}/>
			<ProtectedOTPRoutes exact path="/confirm-by-email" component={SendToEmail} />
			<ProtectedOTPRoutes exact path="/confirm-by-number" component={SendToMobile} />
			<ProtectedOTPRoutes exact path="/check-mobile-otp" component={OtpToMobile} />
			<ProtectedOTPRoutes exact path="/check-email-otp" component={OtpToEmail} />
			<ProtectedRoutes exact path="/userpage" component={UserPage} />	 */
}
