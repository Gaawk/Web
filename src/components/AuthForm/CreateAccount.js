import React, { Fragment, useEffect, useState } from "react";
import AuthForm1 from "./AuthForm1";
import AuthGender from "./AuthGender";
import SelectPassword from "./SelectPassword";
import VerifyAccount from "../VerifyAccount/VerifyAccount";

const CreateAccount = ({}) => {
  const [progress, setProgress] = useState({
    registerInfo: true,
    selectGender: false,
    selectPassword: false,
    verifyAccount: false,
  });
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    fcmToken: "",
    email: "",
    dob: 0,
    genderId: "",
    genderPronoun: "",
    customGender: "",
    selectPassword,
  });

  const setUserInfo = (firstName, lastName, countryCode, email, dob) => {
    setUserData({
      ...userData,
      firstName,
      lastName,
      countryCode,
      fcmToken,
      email,
      dob,
    });
    setProgress({
      registerInfo: false,
      selectGender: true,
      selectPassword: false,
      verifyAccount: false,
    });
  };

  const setUserGender = (genderId, genderPronoun, customGender) => {
    setUserData({ ...userData, genderId, genderPronoun, customGender });
    setProgress({
      registerInfo: false,
      selectGender: false,
      selectPassword: true,
      verifyAccount: false,
    });
  };

  const setUserPassword = (password) => {
    setUserData({ ...userData, password });
    console.log(userData);
    //setAccountToVerify({firstName, lastName, genderId, email, dob, uuid:'2020-2021-2022-098' })

    //HERE WE WILL HANDLE REGISTER LOGIC{ ... }
  };

  return (
    <Fragment>
      {progress.registerInfo && <AuthForm1 setUserInfo={setUserInfo} />}

      {progress.selectGender && <AuthGender setUserGender={setUserGender} />}

      {progress.selectPassword && (
        <SelectPassword getUserPassword={getUserPassword} />
      )}
    </Fragment>
  );
};

export default CreateAccount;

// AFTER FORGET PASSWORD
