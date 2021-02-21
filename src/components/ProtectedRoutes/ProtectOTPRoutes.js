import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { connect }          from "react-redux";

 const ProtectedAuthRoute = ({currentUser, component: Component, ...rest }) => {
   const location= useLocation()
    console.log(location.pathname)
  return (
    <Route
              {...rest}
              render={props => {
                if (props.location.state===undefined) {
                    return  <Redirect
                    to={{
                      pathname: "/",
                      state: {
                        from: props.location
                      }
                    }}
                  />
                  
                } else {
                  return (
                    <Component userData={currentUser}{...props} />
                  );
                }
              }}
            />
  );
};

const mapStateToProps=state=>{
    return {
        currentUser: state.currentUser
    }
}
export default connect(mapStateToProps)(ProtectedAuthRoute) 

{/* <>
{location.pathname=== '/confirm-by-number' || location.pathname==='/confirm-by-email'
     && 
      <Route
      {...rest}
      render={props => {
        if (props.location.state.from===undefined) {
            return  <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location
              }
            }}
          />
          
        } else {
          return (
            <Component currentUser={currentUser}{...props} />
          );
        }
      }}
    /> }
     
     {location.pathname=== "/check-mobile-otp" || location.pathname==='/check-email-otp' && 
            <Route
              {...rest}
              render={props => {
                if (props.location.state===undefined) {
                    return  <Redirect
                    to={{
                      pathname: "/",
                      state: {
                        from: props.location
                      }
                    }}
                  />
                  
                } else {
                  return (
                    <Component userData={currentUser}{...props} />
                  );
                }
              }}
            />}

            </> */}