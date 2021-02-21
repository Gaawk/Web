import React,{Fragment, useEffect, useState}                from 'react';
import { connect } from 'react-redux';
import {
	acceptedPassword,
	passwordsMatch 
}                                                           from '../../helpers/FormValidation'; 
import Required                                             from '../ErrorMessages/Required';
import setAlert                                             from '../../store/actions/alert';     
import './AuthForm.css';

const AuthGender=({ location, setAlert, history }) =>{
    
    const formData= location.state.payload
    const [gender, setGender]=useState({genderId: '', genderPronoun:'', customGender:''})
    const [error, setError] = useState({
        requireGender: false,
        requirePronoun: false 
    })


const handleChange=e=>{
    if(e.target.type==='radio'){
        setGender({...gender, genderId: e.target.value})
        setError({...error, requireGender: false})
    }else{
        setGender({...gender, [e.target.name]: e.target.value})
        setError({...error, requirePronoun: false})

    }

    
}

//Custom gender visibility 
const show={
    display: 'block'
}
const hide={
    display: 'none'
}

//HANDLE FORM SUBMIT
const handleFormSubmit=e=>{
    // setError({requirePronoun: false, requireGender: false})
    e.preventDefault()

if(gender.genderId==='' || gender.genderId==='c' && gender.genderPronoun===''){
    if(gender.genderId===''){
        setError({...error, requireGender: true}) 
        return
    }
    if(gender.genderId==='c' && gender.genderPronoun===''){
        setError({...error, requirePronoun: true}) 
        return
    }
    
}
   
//OLD APPROACH OF DOING REGISTER AUTH IT WITH DIFFERENT ROUTES
    history.push({
        pathname: '/signup/select-password',
        state: {payload: {...formData, ...gender}}
    })
//NEW APPROACH OF DOING REGISTER AUTH WITH ONE ROUTE
//   setUserGender(gender.genderId, gender.genderPronoun, gender.customGender)
}

	return (
            <Fragment>
                <div className="auth-form-layout">
                <div className='form-header'>
                    <div>
					<h2 className='form-title'>
						Select your gender?
					</h2>
                    <p className='form-header-text light-text'>
                        You can decide who can see your gender on your profile by applying visibility settings.
                    </p>
                    </div>
                </div>

                <hr className='form-header-separation'></hr>

				<div className="formInput">
					<form onSubmit={e=>handleFormSubmit(e)}>
						<div className='signup-input-row'>
                            <div className='gender-radio-group'>
                            <label htmlFor='m' className='form-text radio'>
                                Male
                                
                               
                                <input 
                                    className='gender-radio-input'
                                    type="radio"
                                    id='m'
                                    value='m'
                                    checked={gender.genderId==='m'}
                                    onChange={e=>{handleChange(e)}}
                                    /> 
                                    <div className='radio__radio' id='male-margin'></div>
                                   
                                 </label>
                                </div>
                         </div>
                         <div className='signup-input-row'>
                             <div className='gender-radio-group'>
                                <label htmlFor='f' className='form-text radio'>
                                    Female 
                                
                                <input 
                                    className='gender-radio-input'
                                    type="radio"
                                    id='f'
                                    value='f'
                                    checked={gender.genderId==='f'}
                                    onChange={e=>{handleChange(e)}}
                                    />
                                    <div className='radio__radio' id='female-margin'></div>
                                    </label>
                                </div>
                         </div>
                         <div className='signup-input-row'>
                             <div className='gender-radio-group'>
                                 
                                <label htmlFor='c' className='form-text radio'>
                                    Custom 
                                
                                
                                <input 
                                    className='gender-radio-input'
                                    type="radio"
                                    id='c'
                                    value='c'
                                    checked={gender.genderId==='c'}
                                    onChange={e=>{handleChange(e)}}
                                    />
                                    <div className='radio__radio' id='custom-margin'></div>
                                   </label>
                                    
                            </div>
                                    
                                    <Required field={'Gender'} display={error.requireGender}/>
                         </div>
                          {/* { gender.genderId==='c' && */}
                          <div style={gender.genderId==='c'  ? show: hide}>
                             <div className='signup-input-row'>
                            <label className='form-text'>
                                        Select your pronoun<span>&#42;</span> 
                                    </label>
                                    <select name="genderPronoun"
                                 className={ error.requirePronoun ? 
                                     "signup-form-input-bar-error list-value" : "signup-form-input-bar list-value"}
								value={gender.genderPronoun} onChange={e=>handleChange(e)}>
								<option value={""}> Select</option>
								 <option value='she'>She</option>
								 <option value='he'>He</option>
								 <option value='they'>They</option>
							</select>
                            <Required field={'Gender Pronoun'} display={error.requirePronoun}/>
                             
                            </div>
                           <div className='signup-input-row'>
                                    <label className='form-text'>
                                        Enter your gender optionally 
                                    </label>
                                    <input 
                                        className='signup-form-input-bar'
                                        type="text"
                                        name="costumGender"
                                        value={gender.customGender}
                                        onChange={e=>{handleChange(e)}}
                                        />
                            </div>
                           </div>
                           
						<div className="form-group submit-button-container">
							<button className="btn btn-lg submit-button formButton"
									type="submit"
									//style="color:white; background-color:black;"
								>NEXT</button>
						</div>
					</form>
						</div>
                        
				  </div>

        </Fragment>)
			
}



export default connect(null,{setAlert})(AuthGender);
