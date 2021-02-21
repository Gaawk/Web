import axios from 'axios';
// import {configureStore} from "../store";
import {setLocalStorage, getLocalStorage } from './storageHelper';
// import {setToken} from '../store/actions/token' 

// const store=configureStore()


// const token= localStorage.getItem('jwtToken')//localStorage.getItem('jwtToken')? localStorage.getItem('jwtToken'): null
console.log(localStorage.getItem('jwtToken'))
const axiosInstance = axios.create({baseURL:"http://192.168.1.89:8080/gigshack-api-0.0.1",
	headers: {//"Authorization": `Bearer ${token}`,
			  "Content-Type": "application/json"
  }})


  axiosInstance.interceptors.request.use(request=> {
    let token = localStorage.getItem('jwtToken')
	let userId = localStorage.getItem('userId')
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
	if(userId){
		request.headers.userId = `${userId}`
	}

    return request;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(response => {

	return response;
},err=>{
	console.log(JSON.stringify(err))
    console.log(err.config)
	console.log('here');
	const originalRequest = err.config;
	console.log(JSON.stringify(err) +' is error')
	console.log(JSON.stringify(originalRequest)+' is request')

		if(err.response.status!==401){
			return Promise.reject(err)
		}

	if(err.response.status === 401){

			console.log(err)
			console.log('here')
			return axios.post('http://192.168.1.89:8080/gigshack-api-0.0.1/authenticate',
				{
				  username: process.env.REACT_APP_TOKEN_GENERATOR_USERNAME,
				  password: process.env.REACT_APP_TOKEN_GENERATOR_PASSWORD
				})
				.then(res => {
						
						localStorage.setItem("jwtToken", res.data.jwttoken);
								console.log(localStorage.getItem('jwtToken'))
							originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`;
							
						return axios(originalRequest)
					// }
				})
				
		}
	
return Promise.reject(err);
});

export default axiosInstance

