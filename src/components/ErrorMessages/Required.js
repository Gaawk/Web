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

  return (
    <p style={messageStyle}>
      {" "}
      <strong>{field}</strong> is required. Please enter your {field}.{" "}
    </p>
  );
};

export default Required;
