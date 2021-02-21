import React, {useState, useEffect, Fragment} from 'react';
import android from '../../images/AndroidX3.png';
import ios from '../../images/IosX3.png';
import { Link } from 'react-router-dom';
import { connect }  from 'react-redux'
import AdSpace                                   from './AdSpace';
import AuthForm1                                 from '../AuthForm/AuthForm1';

import './Landing.css'


const  Landing=({countries, loading, getCountries, history}) =>{

  
return (
   <Fragment>
      <div className='container ' id='landing-container'>
        <div id='start-onboarding-layout'>
              <div className='row' id='landing-content-container'>
                    <div className='col-md-6  order-md-2 landing-content-left'>
                      <AuthForm1 isSignup={true}/>
                    </div>
                    <div className='col-md-5  order-md-1' id='landing-container-right'>
                    <AdSpace/>
                    </div>
              </div>
              </div>
        </div>
        <div className='container footer'>
           
            <hr className='light-text' id='footer-hr-landing'/>
            <div className='row'>
            <div className='col'>
                    <span className='footer-link text-left'>Privacy</span>{' '}
                    <span className='footer-link'>-</span> {' '}
                    <span className='foofooter-link text-left'>Terms</span> {' '}
                    <span className='footer-link'>-</span> {' '}
                    <span className='footer-link text-left'>Contact Us</span> {' '}
                    <span className='footer-link'>-</span>
                    <span className='footer-link text-left'> Cookies</span> {' '}
                    <span className='footer-link'>-</span> {' '}
                    <span className='footer-link text-left'>More</span>{' '}
                </div>

                <div className='col footer-right text-right'> 
                gaawk <span className='light-text'>&#169; {new Date().getFullYear()}</span>

                </div>
            </div>

            </div>
        <div id='marketing-call-to-action-container'>
            <a href='#Marketing-section' id='marketing-call-to-action'>
                    <div className='text-center'>
                            <p className='mb-0'>Want to know more about gaawk? scroll down... </p>
                            <span className="material-icons mt-0">
                                keyboard_arrow_down
                            </span>
                    </div>
            </a>

        </div>
        <div id='Marketing-section'>

        </div>
    </Fragment>
)
   
}


export default Landing;

