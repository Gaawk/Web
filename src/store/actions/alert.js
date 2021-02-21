import {ADD_ALERT, REMOVE_ALERT} from '../actionTypes';
import {v4 as uuidv4} from 'uuid';

 const setAlert = (message, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: ADD_ALERT,
        payload: { message, alertType, id}
    })

    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), 2500)
}

export default setAlert;