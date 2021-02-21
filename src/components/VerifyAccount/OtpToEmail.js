import React,{Fragment, useState, useEffect }                from 'react';
import {connect}                                             from 'react-redux';
import {useHistory,
		useLocation,
	    Link}                                                from 'react-router-dom';
import { verifyByOtherEmail, 
    verifyByEmail,
    sendOtpToEmail }                                         from '../../store/actions/auth';
import setAlert                                              from '../../store/actions/alert';
import Invalid                                               from '../ErrorMessages/Invalid';
import Required                                              from '../ErrorMessages/Required';
import DontMatch                                             from '../ErrorMessages/DontMatch';
import { isNumber,
		  isEmptyField }                                      from '../../helpers/FormValidation';
import {v4 as uuidv4}						                  from 'uuid'


import '../AuthForm/AuthForm.css';            


//CONST MAYBE HANDLE BY ANOTHER EMAIL TO RESET ALL THE STATE
const OtpToEmail=({ userData, verifyByOtherEmail, verifyByEmail, sendOtpToEmail, setAlert, location, history }) =>{
		 
		const email= location.state.email;
		const sentOtp= location.state.otp;
		const isRegisteredEmail= location.state.originalEmail;




		const [expiresIn, setExpiresIn]= useState(40)
		// const [sessionId, setSessionId]= useState(uniqueSessionId)
		const [showOtpOptions, setShowOtpOtions]= useState(false);
		const [expired, setExpired]= useState(false);
		const [otp, setOTP]= useState('');
		const [resentOtp, setResentOtp]=useState('');
		const [actionLoading, setActionLoading]= useState(false);
		const [error, setError] = useState({
			otpRequired: false,
			invalidOtp: false,
			otpsDontMatch: false,
			expired: false
		})
		
		const pageReloaded=()=>{
			localStorage.setItem('page-reloaded', 'true')
		}
		//REMOVES PAGE-RELOAD FROM LOCAL STORAGE
		const clearReloadFlag=()=>{
			localStorage.removeItem('page-reloaded')
		}

		useEffect(()=>{
			console.log('first effect in otp')
			if(localStorage.getItem('page-reloaded')==='true'){
				setExpiresIn(0)
			}

		},[])
		useEffect(()=>{
			window.addEventListener('beforeunload', pageReloaded)
			return ()=>{
				window.removeEventListener('beforeunload', pageReloaded)
				console.log('removed')
			}
		},[])


		useEffect(()=>{
			var seconds=expiresIn
				let myInterval = setInterval(() => {
						if (seconds > 0) {
							setExpiresIn(seconds - 1);
						}
						else{
							setExpired(true)
						}
					}, 1000)
					return ()=> {
						clearInterval(myInterval);
					};
			
		},[expiresIn])

	 const handleOtpChange= e =>{
		setError({
			otpRequired: false,
			invalidOtp: false,
			otpsDontMatch: false,
			expired: false
		})
		
		 setOTP(e.target.value)
	 }

	//  const handleClearSessionFromStorage=()=>{
	// 	localStorage.removeItem('otpSessionId')
	// 	localStorage.removeItem('previousSessions')
	// }
	

	//HANDLE RESEND OTP
  const handleSendOtpByEmail = () =>{
	console.log(userData +'  from Sending OTP request')
	console.log(isRegisteredEmail+' , '+ email)
	   const Email= isRegisteredEmail ? userData.email : email

	   clearReloadFlag()
		setExpired(false)
		sendOtpToEmail(Email, userData.uuid)
		.then(res=>{
			setExpiresIn(40)
			setResentOtp(res.data.otp)
		})
		.catch(err=>{
			console.log(err)
			/* DO SOMETHING */
		})
	}

	//HANDLE COMPARE OTP
	const handleCompareOtp=()=>{

		
		const otpToCompare = resentOtp === '' ? sentOtp : resentOtp

		if(!isNumber(otp) || isEmptyField(otp) || otpToCompare!==otp || expired===true){
			setError({
			otpRequired: isEmptyField(otp),
			invalidOtp:  !isNumber(otp),
			otpsDontMatch:  otpToCompare!==otp,
			expired: expired
			})
			return
		}
		clearReloadFlag()
		//WE CAN CHECK IF OTP IS VALID FIRST, THEN WE CAN CHECK IF ITS REGISTERED OR NEW EMAIL
 		 console.log('otp is valid')
 
		   if(isRegisteredEmail === true){
		   
			
				setActionLoading(true)
			verifyByEmail(userData.uuid)
			.then(res=>{
				// handleClearSessionFromStorage()
				setActionLoading(false)
			history.push('/userpage')
			})
			.catch(err=>{
				setActionLoading(false)
				console.log(err)
				/*HANDLE ERROR */
				/* REDIRECT TO SIGN UP AGAIN IF USER HEADER IS MISSING */ 
			})
		}else{

			setActionLoading(true)
			verifyByOtherEmail(email, userData.uuid)
			.then(res=>{
				setActionLoading(false)
				history.push('/userpage')
			})
			.catch(err=>{
				setActionLoading(false)
				setAlert('Invalid OTP. Try again.', 'warning')
				console.log(err)
				/*HANDLE ERROR */
				/* REDIRECT TO SIGN UP AGAIN IF USER HEADER IS MISSING */ 
			})
			
		}
	
		

		
	}

	const hanldeByNumber=(e)=>{
		e.preventDefault()
		clearReloadFlag()
		history.push( {pathname: '/confirm-by-number', state: {from: location.pathname}})
}
	return (
			 actionLoading ? <div>Loading...</div> :
			(<Fragment>
			
				<div className="auth-form-layout">
    
				<header className='form-header'>
						<h2 className='form-title'>Confirm your account</h2>
						<p className='form-header-text light-text'>We have sent an email with a code to 
						<span className='d-block form-header-text light-text '><em>{isRegisteredEmail ? `${userData.email}` : `${email}`}</em></span>
						<span className='d-block form-header-text light-text'><strong>Please enter the 6 digit code from the email below</strong></span></p>
						
					</header>
					<hr className='form-header-separation'></hr>
						
				<div className="formInput">
						<div className="signup-input-row">
							<label className='form-text'>
                                       Code <span>&#42;</span>
                            </label>
							<input 
								className={error.invalidOtp || error.otpRequired ||error.otpsDontMatch || error.expired ?
									"signup-form-input-bar-error" : "signup-form-input-bar"}
								type="text"
								name="code"
								value={otp}
								onChange={e=>handleOtpChange(e)}
								/>
								<Invalid field={'OTP'} display={error.invalidOtp}/>
								<Required field={'OTP'} display={error.otpRequired}/>
								<DontMatch field={'OTP'} display={error.otpsDontMatch || error.expired}/>
						</div>
						<div className="submit-button-container">
							<button onClick={()=>handleCompareOtp()}
							className="btn btn-lg btn-block submit-button formButton"
									type="submit"
								>Confirm</button>
						</div>

						<div className="form-button-container">
					<button onClick={()=>setShowOtpOtions(!showOtpOptions)} className='i-did-not-get-otp'>
						I didn't recieve the code</button>
					</div>
						
						<div className="form-button-container">
							<Link onClick={()=>clearReloadFlag()}
							 to={ {pathname: '/confirm-by-email', state: {from: location.pathname}}} 
							className= {showOtpOptions ? 'btn btn-lg btn-block form-button-secondary show-otp-options' 
							: 'btn btn-lg btn-block form-button-secondary hide-otp-options'}>
								Confirm by other email
							</Link>
						</div>
						<div className="form-button-container">
							<Link onClick={()=>clearReloadFlag()}
							 to={ {pathname: '/confirm-by-number', state: {from: location.pathname}}} 
									className= {showOtpOptions ? 'btn btn-lg btn-block form-button-secondary show-otp-options' 
									: 'btn btn-lg btn-block form-button-secondary hide-otp-options'}>
								Add another number
							</Link>
						</div>
						<div className="form-button-container last-form-button">
							<button onClick={()=>handleSendOtpByEmail()}
							 className= {showOtpOptions ? 'btn btn-lg btn-block form-button-secondary show-otp-options' 
							 : 'btn btn-lg btn-block form-button-secondary hide-otp-options'}> 
							Send code again <span>{expiresIn > 0 && `(${expiresIn})`}</span>
							</button>
						</div>
						<div className='text-center form-end-question-link-container'>
                               <Link to={'/logout'} className='form-text-lighter form-end-question-link' >
                                     Logout
                                   </Link>
                         </div>
						</div>
				  </div>
			
		</Fragment>
		))
}


export default connect(null,{verifyByOtherEmail, verifyByEmail, sendOtpToEmail, setAlert})(OtpToEmail);