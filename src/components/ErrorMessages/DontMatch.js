import React from "react";

const DontMatch=({field, display })=>{

    var messageStyle;

    if(display===true){
     messageStyle={
        fontSize: '12px',
        color: 'red',
        display: 'block' 
    }
    }else{
       messageStyle={
            fontSize: '12px',
            color: 'red',
            display: 'none'
       }
    }

    return field === 'OTP' ? <p style={messageStyle}> Incorrect OTP or Session expired. Please try again</p>
    : <p style={messageStyle}> {field}s dont match. Please enter matching {field}s </p>
}

export default DontMatch