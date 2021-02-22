import React, { Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import Login from "../AuthForm/Login";
import BrandIcon from "../../images/Icon.png";
import "./NavBar.css";

const NavBar = ({ currentUser, logout, landing }) => {
  const history = useHistory();
  const location = useLocation();
  const Logout = (e) => {
    e.preventDefault();
    logout();
    history.push("/");
  };

  // if(currentUser.user==={}){
  // 	logout();
  // 	history.push('/')
  // }

  //<img src={Logo} className="theAlephLogo" alt="The-aleph Home"/>
  const userLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to={"/userpage"} className="nav-text">
          Profile
        </Link>
      </li>

      <li>
        <a onClick={(e) => Logout(e)} className="ml-5 nav-text">
          Log out
        </a>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="nav navbar-nav navbar-right">
      <li>
        <Link to="/signin" className="nav-text">
          Log in
        </Link>
      </li>
      <li>
        <Link to="/signup" className="ml-5 nav-text">
          Sign up
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      {location.pathname === "/signup/select-password" ||
      location.pathname === "/signup/select-gender" ||
      location.pathname === "/confirm-by-email" ||
      location.pathname === "/confirm-by-number" ||
      location.pathname === "/check-mobile-otp" ||
      location.pathname === "/check-email-otp" ? (
        <nav className="navbar navbar-expand">
          <div className="container">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand nav-text">
                  <img src={BrandIcon} alt="gigshack" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand">
          <div className="container">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link to="/" className="navbar-brand nav-text">
                  <img src={BrandIcon} alt="gigshack" />
                </Link>
              </div>
              {currentUser.isAuthenticated ? userLinks : <Login />}
            </div>
          </div>
        </nav>
      )}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(NavBar);

// const dontHaveAccount= (
// 	<ul className="nav navbar-nav navbar-right" >
// 		<li className='nav-question-container'>
// 			<Link  to="/signup" className='nav-text nav-question'>
// 				<span className='hide-at-small'>Don't have an account? </span></Link>
// 		</li>
// 		<li>
// 			<Link to="/signup" className='nav-button btn nav-Link-auth'>Sign up</Link>
// 		</li>
// 	</ul>
// )
// const alreadyHaveAccount=(
// 	<ul className="nav navbar-nav navbar-right" >
// 			<li className='nav-question-container'>
// 				<Link  to="/signin" className='nav-text nav-question'>
// 					<span className='hide-at-small'>Already have an account? </span></Link>
// 			</li>
// 			<li>
// 				<Link to="/signin" className='nav-button btn  nav-Link-auth'>Log in</Link>
// 			</li>
// 		</ul>
// )

// {
// 	location.pathname==='/signup' &&

// 		<nav className='navbar navbar-expand'>
// 		<div className='container'>
// 			<div className="container-fluid">
// 				<div className="navbar-header">
// 					<Link to="/" className="navbar-brand nav-text">
// 						<img src={BrandIcon} alt='gigshack'/>
// 					</Link>
// 				</div>
// 						{alreadyHaveAccount}
// 			</div>
// 		</div>
// 	</nav>
// }
// {
// 		location.pathname==='/signin' &&

// 		<nav className='navbar navbar-expand'>
// 		<div className='container'>
// 			<div className="container-fluid">
// 				<div className="navbar-header">
// 					<Link to="/" className="navbar-brand nav-text">
// 						<img src={BrandIcon} alt='gigshack'/>
// 					</Link>
// 				</div>
// 						{dontHaveAccount}
// 			</div>
// 		</div>
// 	</nav>
// }
