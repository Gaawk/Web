import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import android from "../../images/Android.png";
import ios from "../../images/Ios.png";

import "./Footer.css";

const Footer = ({}) => {
  const location = useLocation();
  return (
    <Fragment>
      {location.pathname !== "/" && (
        <div className="container footer">
          <div className="text-center">
            <p>
              gaawk{" "}
              <span className="light-text">
                &#169; {new Date().getFullYear()}
              </span>
            </p>
          </div>
          <hr className="light-text" />
          <div className="row">
            <div className="col">
              <span className="footer-link text-left">Privacy</span>
              <span className="footer-link">-</span>
              <span className="foofooter-link text-left">Terms</span>
              <span className="footer-link">-</span>
              <span className="footer-link text-left">Contact Us</span>
              <span className="footer-link">-</span>
              <span className="footer-link text-left">Cookies</span>
              <span className="footer-link">-</span>
              <span className="footer-link text-left">More</span>
            </div>

            <div className="col footer-right text-right">
              <span className="light-text footer-right-item hide-at-small">
                {" "}
                Download Our App
              </span>
              <span className="footer-right-item footer-right-item">
                <img src={android} />
              </span>
              <span className="footer-right-item footer-right-item">
                <img src={ios} />
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Footer;
