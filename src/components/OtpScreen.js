import React, { useState, Fragment }                                         from 'react';
import { Link, useHistory, useLocation }                         from 'react-router-dom';
import { connect }                                               from 'react-redux';


const OtpScreen = ()=>{

    const [otp, setOtp] = useState(new Array(6).fill(''))


    const handleChange=(element, index)=>{
        if(isNaN(element.value)){
            console.log('only numbers')
            return false
        }
        
        let arr= [...otp]
        arr[index]=element.value
        setOtp([...arr])
        
        //  console.log(element.value)

        // setOtp(...otp.map((d, idx)=> (index===idx) ? element.value : d))

        //FOCUS ON NEXT ELEMENT
        if(element.nextSibling){
            element.nextSibling.focus();
        }
   }

		return(<Fragment>
            <div className='text-center mt-5'>
            <p>Enter the OTP here.</p>
            { otp.map( (data,index) =>{
                
                return <input
                            className='otp-field'
                            type='text'
                            name='otp'
                            maxLength='1'
                            key={index}
                            value={data}
                            onChange={(e)=>handleChange(e.target, index)}
                            onFocus={e=>e.target.select()}/>
            })}
           
            <button onClick={()=>console.log(otp.join(""))}>
                Submit OTP
            </button></div>
             </Fragment>)
	
	}


export default OtpScreen;