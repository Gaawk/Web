import React, {useState, useEffect, Fragment} from 'react';
import { connect }                            from 'react-redux'

const  UserHomePage=({currentUser}) =>{

  
return (
   <Fragment>
     <p className='text-center mt-5'> POSTS AND LIVE FEEDS GO HERE</p>
    </Fragment>
) 
}

const mapStateToProps=state=>{
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(UserHomePage);