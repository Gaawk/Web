import React from "react";

const Required = ({ field, display }) => {
  var messageStyle;

  if (display === true) {
    messageStyle = {
      fontSize: "12px",
      color: "red",
      display: "block",
    };
  } else {
    messageStyle = {
      fontSize: "12px",
      color: "red",
      display: "none",
    };
  }
  const email = (
    <p style={messageStyle}>Email is required. Please enter your email.</p>
  );
  const password = (
    <p style={messageStyle}>
      A password must be 8 characters Long. It should include atleast 1 number
      and 1 special character.
    </p>
  );
  const number = <p style={messageStyle}>Please enter only digits.</p>;
  const otp = <p style={messageStyle}>OTP must be only digits.</p>;
  return (
    <>
      {field === "Email" && email}
      {field === "Password" && password}
      {field === "Number" && number}
      {field === "OTP" && otp}
    </>
  );
};

export default Required;
