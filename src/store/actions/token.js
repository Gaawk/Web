import{ SET_TOKEN }  from '../actionTypes';
import{ setTokenHeader } from '../../helpers/api';
import  setAlert                                              from './alert';
import axios                                               from 'axios';
// import {setLocalStorage, getLocalStorage } from './storageHelper';


export function setToken(token){
	return {
		type: SET_TOKEN,
		token
	}
}

export function  getJwtToken(){
	return dispatch =>{
		 
		return new Promise((resolve,reject)=>{
            const body={
                username:process.env.REACT_APP_TOKEN_GENERATOR_USERNAME,
                password:process.env.REACT_APP_TOKEN_GENERATOR_PASSWORD
            }
			const path="http://192.168.1.89:8080/gigshack-api-0.0.1/authenticate"
			return axios.post(path,body, {
				headers: {
                'Content-Type': 'application/json'
            }
			})
			.then((res)=>{
				console.log(res.data.token+' is the new token');
				localStorage.setItem("jwtToken", res.data.token);
				// setTokenHeader(res.data.token);
                dispatch(setToken(res.data.token))//ASK IF RESPONSE IS JUST STRING
				// resolve(res.data.token)
			}).catch(err => {
				console.log(err.response)
				reject(err)
			})
		});
	}
}



export function checkIfAuthorized(){
	
	return dispatch =>{
	return new Promise((resolve,reject)=>{
		let fcmToken= process.env.REACT_APP_TOKEN_RANDOM_FCM
		let email= process.env.REACT_APP_TOKEN_RANDOM_EMAIL
		let password= process.env.REACT_APP_TOKEN_RANDOM_PASSWORD
		const path=`http://192.168.1.89:8080/gigshack-api-0.0.1/users/login?fcmToken=${fcmToken}&login=${email}&password=${password}`
		
		return axios.get(path, {
			headers: {
			'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpb3MiLCJpYXQiOjE2MTIxNTg3NzIsImV4cCI6MTYxMjIwMTk3Mn0.uCphsAlIy1kB5aI2anigDjZEDC-_6FpT4Qp_blnqoUE',
			'Content-Type': 'application/json'
			
		}
		})
		.then(res=>{
			resolve('SUCCESS')
		}
		)
		.catch(err => {
			console.log(err.response.status)
			if(err.response.status===401){
				reject('EXPIRED')
			}else{
				reject('OTHER ISSUES')
			}
					
			// setAlert(err.response, "warning");
	  reject(err)
		});
	});
}


}