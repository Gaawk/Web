import React, { useEffect } from "react";
import { connect } from "react-redux";

const UserPage = ({ currentUser, userData }) => {
  console.log(userData);
  return (
    <div className="text-center mt-5">
      <h2>
        WELCOME{" "}
        <strong>
          {userData.firstName} {userData.lastName}
        </strong>
      </h2>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userData: state.currentUser.user,
  };
};

export default connect(mapStateToProps)(UserPage);
