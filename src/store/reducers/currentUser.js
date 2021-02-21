import {SET_CURRENT_USER, VERIFY_EMAIL} from '../actionTypes';

const DEFAULT_STATE={
	isAuthenticated: false,
	user: {},
	// loading: true
}

export default (state=DEFAULT_STATE, action)=>{
	const {type,user,message}=action
	switch(type){
		case SET_CURRENT_USER:
	    return {
			     user: user,
				isAuthenticated: user.emailVerified===true || user.mobileVerified===true 
				
			   }
		case VERIFY_EMAIL:
			return {
				...state,
				loading: false,
				message: message
			}
		default:
			return state;
			
	}
	
}