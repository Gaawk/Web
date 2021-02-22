import React from "react";

const Under18 = ({ display }) => {
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

  return (
    <p style={messageStyle}>
      {" "}
      We are sorry, but you have to be over 18 to register.
    </p>
  );
};

export default Under18;
