import  axiosInstance                                      from '../../helpers/api';
import { SET_COUNTRIES }                                    from '../actionTypes';
import  setAlert                                           from './alert';
import axios from 'axios';
// import superagent from 'superagent'


export function setCountries(countries){
	return {
		type: SET_COUNTRIES,
		countries
	}
}

export function getCountries(){

	return dispatch =>{
		//  let token= localStorage.getItem('jwtToken')
			return axiosInstance.get('/country')//,{
			// 	"Authorization": `Bearer ${token}`,
			// 	"Content-Type": "application/json"
			// })
			.then((res)=>{
				console.log(res)
				dispatch(setCountries(res))
				
			}).catch(err => {
				console.log(err)
			})
		
	}
}