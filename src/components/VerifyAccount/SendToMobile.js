import React,{Fragment, useEffect, useState}                from 'react';
import {connect}                                 			from 'react-redux';
import {useHistory,
		useLocation,
		Link}                                   		    from 'react-router-dom';
import { getCountries }               						from '../../store/actions/country';
import {
	isEmptyField,
	isNumber
}                                                           from '../../helpers/FormValidation'
import Required                                             from '../ErrorMessages/Required';
import Invalid                                              from '../ErrorMessages/Invalid';
import { loginUser }                           			    from '../../store/actions/auth';
import { verifyByNumber,
	     verifyByEmail, 
		sendOtpToMobile,
		sendOtpToEmail,
	 }                        								from '../../store/actions/auth';
import setAlert                     		                from '../../store/actions/alert';
import countries                                		    from '../../helpers/countries';

// import { Firebase }                             from '../../helpers/firebaseConfig';
import '../AuthForm/AuthForm.css';
import currentUser from '../../store/reducers/currentUser';
//CONST MAYBE HANDLE BY ANOTHER NUMBER TO RESET ALL THE STATE

const SendToMobile=({ userData, sendOtpToMobile, sendOtpToEmail, setAlert, location , history}) =>{

		// console.log(currentUser.user)
		// const userId=currentUser.user.uuid;
		// const history= useHistory();
		// const currentUser= location.state.user// user details from register
		const [actionLoading, setActionLoading]= useState(false);
	 	const [mobileNumber, setMobileNumber]=useState({code:"", number: ""})
		 const [error, setError] = useState({
			 codeRequired: false,
			 numberRequired: false,
			 invalidNumber: false
		 })


	 const handleNumberChange=e=>{
		 console.log(e.target.value)
		 console.log(e.target.value)

			 setMobileNumber({
			 ...mobileNumber, [e.target.name]:e.target.value
			 })

		if(e.target.name==='code'){
			setError({...error, codeRequired: false})
		}
		if(e.target.name==='number'){
			setError({...error, numberRequired: false, invalidNumber: false})
		}
			 
	 }
	
	const handleConfirmByNumber=()=>{
		const { code, number } =  mobileNumber;
		if(isEmptyField(code) || isEmptyField(number)){
			setError({...error, codeRequired: isEmptyField(code), numberRequired: isEmptyField(number)})
			return
		}
		if( !isNumber(number) ){
			setError({...error, invalidNumber: true})
			return
		}
	    console.log(userData)
		
		setActionLoading(true)
		// console.log(code+' '+number)
		const fullNumber= code.concat(number)
		// console.log(fullNumber)
		// sendOtpToMobile(fullNumber, currentUser.user.uuid)//HAVING ISSUES HERE
		sendOtpToMobile(fullNumber, userData.uuid)//SOLVING ISSUES HERE


		.then(res=>{
			console.log('came here to confirm by number success')
			setActionLoading(false)
			history.push({
				pathname: '/check-mobile-otp',
				state : {otp: res.data.otp, code, number}//SOLVING ISSUES HERE-->i removed userData from here
			})})
		.catch(err=>{
			setActionLoading(false)
			console.log(err)
			/* DO SOMETHING */
		})
	}

	 const handleConfirmByEmail = () =>{
		
		setActionLoading(true)
		console.log(userData)
		sendOtpToEmail(userData.email, userData.uuid)

		.then(res=>{
			setActionLoading(false)
			history.push({
				pathname: '/check-email-otp',
				state : {otp: res.data.otp, email: userData.email,  originalEmail: true}//Removed userData from here also
			

			})
		})
		.catch(err=>{
			setActionLoading(false)
			console.log(err)
			/* DO SOMETHING */
		})
	}
	


	return (actionLoading ? <div>Loading...</div> :
		(<Fragment>
			<div className="auth-form-layout">
			<header className='form-header'>
						<h2 className='form-title'>
							Enter your mobile number
						</h2>
						<p className='form-header-text light-text mb-0'>Enter a mobile number which will be linked to your account.</p>
						<span className='d-block form-header-text light-text mt-0'>This number will not be published on your profile unless you choose to make it visible.</span>
					</header>	
			<hr className='form-header-separation'></hr>
			<div className="formInput">
			
					
						
					<label className='form-text'>
                                        Mobile Number<span>&#42;</span> 
                                    </label>
					<div className="signup-input-row row" id='mobile-number-input'>
					
					<div id='dial-code-to-register-container' className='col-4'>
					<select name="code" className={error.codeRequired? "signup-form-input-bar-error" : "signup-form-input-bar"}
								
								value={mobileNumber.code} onChange={e=>handleNumberChange(e)} id='dial-code'required>
								<option value={''}>Select</option>
								{ countries.map(country=>{
									return <option key={country.code} value={country.dialCode}>
										{country.code}({country.dialCode})
									</option>
								})
								}
							</select></div>
					    <div id='number-to-register-container' className='col-8'>
						<input
							className={error.numberRequired || error.invalidNumber ?
								 "signup-form-input-bar-error w-100" : "signup-form-input-bar col-8 w-100" }

							type="text"
							id='number-to-register'
							name="number"
							placeholder='Number'
							value={mobileNumber.number}
							onChange={e=>handleNumberChange(e)}
							/></div>
							
					
					</div>
					<Required field={'Dial code'} display={error.codeRequired}/>
					<Required field={'Number'} display={error.numberRequired }/>
					<Invalid field={'Number'} display={error.invalidNumber} />
					<div className="submit-button-container">
						<button 
						onClick={handleConfirmByNumber}
						className="btn btn-lg submit-button formButton"
								type="submit">
									NEXT
						</button>
					</div>
				
					<div className="form-button-container last-form-button">
							<button onClick={handleConfirmByEmail} 
							className='btn btn-lg btn-block form-button-secondary'>
								Confirm by registered email
							</button>
					</div>
					
					<div className='text-center form-end-question-link-container'>
                               <Link to={'/logout'} className='form-text-lighter form-end-question-link' >
                                     Logout
                                   </Link>
                                   </div>
					</div>
	</div>)
	
	</Fragment>
	)
	)
		
}



export default connect(null,{ sendOtpToMobile, sendOtpToEmail, getCountries, setAlert})(SendToMobile);

