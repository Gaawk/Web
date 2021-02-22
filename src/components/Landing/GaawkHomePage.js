import React, { useState, useEffect, Fragment } from "react";
import Landing from "./Landing";
import UserHomePage from "./UserHomePage";
import { connect } from "react-redux";

const GaawkHomePage = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <Fragment>
      {currentUser.isAuthenticated ? <UserHomePage /> : <Landing />}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps)(GaawkHomePage);
