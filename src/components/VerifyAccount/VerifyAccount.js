import React,{Fragment, useEffect, useState}     from 'react';
import SendToEmail                                from './SendToEmail';
import SendToMobile                                from './SendToMobile';
import OtpToEmail                                  from './OtpToEmail';
import OtpToMobile                                 from './OtpToMobile';
import { sendOtpToEmail } from '../../store/actions/auth';



const CreateAccount=({accountToVerify}) =>{

console.log(accountToVerify)

    const [screen, setScreen]= useState({SendToMobile: true, SendToEmail: false, otpToMobile: false, otpToEmail: false})
   
    // const []


    return (
        <Fragment>

            {screen.SendToMobile && <SendToMobile />}

            {screen.SendToEmail && <sendOtpToEmail/>}

            {screen.otpToMobile && <otpToMobile/>}

            {screen.otpToEmail && <otpToEmail/>}


        </Fragment>
    )

			
}



export default CreateAccount;
