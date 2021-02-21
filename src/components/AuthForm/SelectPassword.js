import React,{Fragment, useEffect, useState}                from 'react';
import { registerUser }                                     from '../../store/actions/auth';
import setAlert                                             from '../../store/actions/alert';     
import Invalid                                              from '../ErrorMessages/Invalid';
import DontMatch                                            from '../ErrorMessages/DontMatch';
import {
	acceptedPassword,
	passwordsMatch 
}                                                           from '../../helpers/FormValidation'; 


import './AuthForm.css';
import { connect } from 'react-redux';

const AuthGender=({ location, history, registerUser , setUserPassword}) =>{
    
    const [actionLoading, setActionLoading]= useState(false)
    const [password, setSeePassword] = useState({password1: false, password2: false})
    const [data, setData]= useState({password1: '', password2:''})
    const [error, setError]= useState({
        invalidPassword: false,
        passwordsDontMatch: false
    })
    const formData= location.state.payload



const handleChange=e=>{

    setData({...data, [e.target.name]: e.target.value})
    if(e.target.name==='password1'){
        setError({...error, invalidPassword: false})
    }
    if(e.target.name==='password2'){
        setError({...error, passwordsDontMatch: false})
    }
}


//HANDLE FORM SUBMIT
const handleFormSubmit=e=>{
 e.preventDefault()
 const { password1, password2}= data

 if(acceptedPassword(password1)===false || passwordsMatch(password1, password2)===false){
     if(acceptedPassword(password1)===false){
         setError({...error, invalidPassword: true})
         return
     }
      if(passwordsMatch(password1, password2) === false){
        setError({...error, passwordsDontMatch: true})
        return
    }
    
 }


// setUserPassword(data.password1)
const {firstName, lastName, genderId, genderPronoun, email, customGender, countryCode, fcmToken, dob}= formData

// history.push({ pathname: '/confirm-by-number', state: {userData: {firstName, lastName, genderId, email, dob, uuid:'2020-2021-2022-098' }}})
//THIS IS THE OLD APPROACH USING DEIFFERENT AUTH ROUTES
registerUser({
    firstName,
     lastName, 
     genderId, 
     genderPronoun, 
     email,
     customGender,
     countryCode,
     fcmToken,
     dob,
     password: data.password1})
.then(res=>{
   setActionLoading(false);
   history.push({ pathname: '/confirm-by-number', state: {userData: res.data}})
}).catch(err=>{ 
   setActionLoading(false);
   console.log(err)})
  
}
	return (
            <Fragment>
                <div className="auth-form-layout">
                <div className='form-header'>
					<h2 className='form-title'>
						Choose a password
					</h2>
                    <p className='form-header-text light-text'>Choose a password with 8 characters. It should include atleast 1 number and 1 special character.</p>
                    </div>
                    
                <hr className='form-header-separation'></hr>
				<div className="formInput">
                
					<form onSubmit={e=>handleFormSubmit(e)}>
						<div className='signup-input-row password-row'>
                        <label className='form-text'>
                                        Password <span>&#42;</span>
                                    </label>
                                    <input 
                                        className={error.invalidPassword ?
                                             'signup-form-input-bar-error password-input': 'signup-form-input-bar password-input'}
                                        type={password.password1 ? 'text' : 'password'}
                                        name="password1"
                                        value={data.password1}
                                        onChange={e=>{handleChange(e)}}
                                        />
                                        <span onClick={()=>{setSeePassword({...password,password1: !password.password1})}} 
                        className="material-icons light-text see-password-register position-passwords">
                                        {password.password1 ? 'visibility' : 'visibility_off'}
                                        </span>
                                        <Invalid field={'Password'} display={error.invalidPassword}/>
                         </div>

                            <div className='signup-input-row password-row'>
                            <label className='form-text'>
                                        Re-enter Password <span>&#42;</span>
                                    </label>
                                    <input 
                                        className={error.passwordsDontMatch ?
                                            'signup-form-input-bar-error password-input': 'signup-form-input-bar password-input'}
                                        type={password.password2 ? 'text' : 'password'}
                                        name="password2"
                                        value={data.password2}
                                        onChange={e=>{handleChange(e)}}
                                        />
                                        <span onClick={()=>{setSeePassword({...password,password2: !password.password2})}} 
                        className="material-icons light-text see-password-register position-passwords">
                                        {password.password2 ? 'visibility' : 'visibility_off'}
                                        </span>
                                        <DontMatch field={'Password'} display={error.passwordsDontMatch}/>
                            </div>
                            <div className='signup-input-row text-center'>
                                <p className='form-instructions light-text'>
                                    By clicking Sign Up you agree to our Terms, Data policy and Cookie policy. You may recieve
                                    emails and SMS notifications from <strong>g<span style={{textDecoration: 'underline'}}>aawk</span></strong>,
                                     but you can opt out at any time.
                                </p>
                            </div>
                           
						<div className="form-group submit-button-container">
							<button className="btn btn-lg submit-button formButton"
									type="submit"
								>NEXT</button>
						</div>
                       
					</form>
						</div>
				  </div>

        </Fragment>)
			
}



export default connect(null,{registerUser})(AuthGender);