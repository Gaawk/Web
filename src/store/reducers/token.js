import {SET_TOKEN} from '../actionTypes';

const DEFAULT_STATE={
	token: ""
}

export default (state=DEFAULT_STATE, action)=>{
	const {token, type}=action
	switch(type){
		case SET_TOKEN:
	    return {
                    token: token
			   }
		default:
			return state;
			
	}
	
}