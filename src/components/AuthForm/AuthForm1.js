import React,{Fragment, useEffect, useState}     from 'react';
import {connect}                                 from 'react-redux';
import { Link, useHistory }                                   from 'react-router-dom';
import setAlert                                  from '../../store/actions/alert';
import countries                                 from '../../helpers/countries';
import Required                                  from '../ErrorMessages/Required';
import Invalid                                   from '../ErrorMessages/Invalid';
import DontMatch                                 from '../ErrorMessages/DontMatch';
import Under18                                   from '../ErrorMessages/Under18';
import {
	isEmptyField,
	acceptedEmail,
	acceptedPassword,
	emailsMatch,
	passwordsMatch,
    userIsUnder18
}                                                from '../../helpers/FormValidation';   
import './AuthForm.css';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const AuthForm1=({ isSignup }) =>{
    
    
	const [actionLoading, setActionLoading]= useState(false);
    const [seePassword, setSeePassword]=useState(false)
    const [removeErrors, setRemoverErrors]= useState(false)
    const [formData, setFormData]=useState({
        firstName:"",
        lastName:"",
        countryCode: "",
        email: "",
        retypeEmail: "",
        fcmToken: 'Thisisahardcodedvalue',
        dob: 0 })
    const [error, setError] = useState({ invalidEmail: false, invalidPassword: false, emailRequired: false, passwordRequired: false })
    const history= useHistory()
	useEffect(()=>{
        setError({ invalidEmail: false,
                   invalidPassword: false,
                   requireFirstName: false,
                   requireLastName: false,
                   requireCountryCode: false,
                   requireDob: false,
                   emailsDontMatch: false,
                   under18: false})
    },[isSignup])

//REGISTER LOGIC
const handleChange=e=>{
    setFormData({...formData, [e.target.name]: e.target.value})
    if(e.target.name==='email'){
        //try useCallback here--> setERROR WITH console.log(to see how many times it setsError)
        setError({...error, invalidEmail: false})

    }
    if(e.target.name==='firstName'){
        setError({...error, requireFirstName: false})
    }
    if(e.target.name==='lastName'){
        setError({...error, requireLastName: false})
    }
    if(e.target.name==='countryCode'){
        setError({...error, requireCountryCode: false})
    }
    if(e.target.name==='retypeEmail'){
        setError({...error, emailsDontMatch: false})
    }
   

}
const handleDateChange=e=>{
    var value=  Date.parse(e.target.value)
    setFormData({...formData, dob: e.target.value})//new Date(e.target.value).getTime()})
    setError({...error, requireDob: false, under18: false})
}

//HANDLE FORM SUBMIT
const handleFormSubmit=e=>{
    
    e.preventDefault()
   setActionLoading(true)

    
         let { firstName, lastName, countryCode, email, fcmToken, retypeEmail, dob}= formData
    
        if(isEmptyField(firstName) || isEmptyField(lastName) || isEmptyField(countryCode)  || dob===0 || !acceptedEmail(email)
                || !emailsMatch(email, retypeEmail) || userIsUnder18(dob)){
                       

            setError({
                invalidEmail: !acceptedEmail(email) ? true : false ,
                requireFirstName: isEmptyField(firstName) ? true : false,
                requireLastName: isEmptyField(lastName)? true : false,
                requireCountryCode: isEmptyField(countryCode) ? true : false,
                requireDob: dob===0 ? true : false,
                emailsDontMatch: !emailsMatch(email, retypeEmail) ? true : false,
                under18: userIsUnder18(dob) ? true : false

            })
                return
        }
           
       

         let epochTime= new Date(formData.dob).getTime()
         let userData={firstName, lastName, countryCode,fcmToken, email, dob: epochTime}
         console.log(userData)
         //THIS IS THE OLD APPROACH USING DEIFFERENT AUTH ROUTES
         history.push({
             pathname: '/signup/select-gender',
             state: { payload: {...userData}}
         })

        //THIS IS THE NEW APPROACH USING ONE AUTH ROUTE
    // setUserInfo(userData.firstName, userData.lastName, userData.countryCode, userData.fcmToken, userData.email, userData.dob)
    
    
}
	return (
            <Fragment>
                <h2 id='form-header-landing'>
						Sign up
					</h2>
				<div id="form-input-landing">
                
					<form onSubmit={e=>handleFormSubmit(e)}>
                   
						<div className='signup-input-row-landing  row'id='label-container'>
                            <div className='signup-label-container-landing col-3  d-flex align-items-end'>
                                <label className='form-text-landing'>
                                    First Name <span>&#42;</span> 
                                </label>
                            </div>
                            <div className='signup-input-row-landing col-9 '>
                                <input 
                                    className={error.requireFirstName ? 'signup-form-input-bar-landing-error' : 'signup-form-input-bar-landing'} 
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={e=>{handleChange(e)}}
                                    />
                                   
                            </div>
                            
                         </div>
                         <Required field={'First name'} display={error.requireFirstName}/>

                         <div className='signup-input-row-landing  row'>
                             <div className='signup-label-container-landing col-3  d-flex align-items-end'>
                                    <label className='form-text-landing'>
                                        Last Name <span>&#42;</span> 
                                    </label>
                            </div>
                            <div className='signup-input-row-landing col-9 '>
                                    <input 
                                        className={error.requireLastName ? 'signup-form-input-bar-landing-error' : 'signup-form-input-bar-landing'} 
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={e=>{handleChange(e)}}
                                        />
                                        
                                </div>
                               
                            </div>
                            <Required field={'Last name'} display={error.requireLastName}/>
                            <div className='signup-input-row-landing  row'>
                                <div className='signup-label-container-landing col-3  d-flex align-items-end'>
                                    <label className='form-text-landing'>
                                        Country <span>&#42;</span> 
                                    </label>
                                </div>
                                <div className='signup-input-row-landing col-9 '>
                                    <select name="countryCode" 
                                    
                                    className={error.requireCountryCode ? 'signup-form-input-bar-landing-error' : 'signup-form-input-bar-landing'} 
								value={formData.countryCode} onChange={e=>handleChange(e)}>
								<option value={""}> Select</option>
								{ countries.map(country=>{
									return <option key={country.code} value={country.code}>
										{country.name}{"  "}({country.dialCode})
									</option>
								})
								}
							</select>
                              
                              </div>
                            </div>
                            <Required field={'Country'} display={error.requireCountryCode}/> 
                            <div className='signup-input-row-landing  row'>
                                <div className='signup-label-container-landing col-3  d-flex align-items-end'>
                                    <label className='form-text-landing'>
                                    
                                       Email  <span>&#42;</span>
                                       
                                    </label>
                                </div>
                                <div className='signup-input-row-landing col-9 '>
                                    <input 
                                        className={ error.invalidEmail ?
                                            'signup-form-input-bar-landing-error':'signup-form-input-bar-landing' }
                                        
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e)=>{handleChange(e)}}
                                        />
                                        
                                    </div>
                            </div>
                            <Invalid field={'Email'} display={error.invalidEmail}/>
                            <div className='signup-input-row-landing  row'>
                                <div className='signup-label-container-landing col-3  d-flex align-items-end'>
                                    <label className='form-text-landing'>
                                        Re-type Email <span>&#42;</span>
                                    </label>
                                </div>
                                <div className='signup-input-row-landing col-9 '>
                                    <input 
                                        className={error.emailsDontMatch ? 'signup-form-input-bar-landing-error' : 'signup-form-input-bar-landing'}
                                        type="text"
                                        name="retypeEmail"
                                        value={formData.retypeEmail}
                                        onChange={e=>{handleChange(e)}}
                                        />
                                </div>
                            </div>
                            <DontMatch field={'Email'} display={error.emailsDontMatch}/>

                            <div className='signup-input-row-landing  row'>
                                <div className='signup-label-container-landing col-3  d-flex align-items-end'>
                                    <label className='form-text-landing'>
                                        Date of Birth <span>&#42;</span> 
                                    </label>
                                </div>
                                <div className='signup-input-row-landing col-9 '>
                                    <input 
                                        className={ error.requireDob || error.under18 ?
                                            'signup-form-input-bar-landing-error':'signup-form-input-bar-landing' }
                                        name="dob" 
                                        type="date" 
                                        value={formData.dob}
                                        onChange={e=>handleDateChange(e)}
									/>
                                    
                                </div>
                            </div>
                            <Required field={'Date of Birth'} display={error.requireDob}/>
                            <Under18 display={error.under18}/>
						<div  id='submit-button-container-landing'className='mb-0'>
							<button className="btn btn-lg  submit-button-landing formButton"
									type="submit"
									//style="color:white; background-color:black;"
								>Start gaawking</button>
						</div>
                        
                      
					</form>
            </div>
                 

        </Fragment>)
}
export default connect(null,{setAlert})(AuthForm1);