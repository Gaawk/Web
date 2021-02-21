import{combineReducers}                              from 'redux';
import currentUser                                   from './currentUser';
import token                                         from './token';
import alert                                         from './alert'; 
import country                                       from './country'


const rootReducer = combineReducers({
	currentUser,//currentUser: currentUser
	country,
	alert,
	token,
	
});

export default rootReducer;