import React, {useState, useEffect, Fragment} from 'react';
import android from '../../images/AndroidX3.png';
import ios from '../../images/IosX3.png';

const  AdSpace=() =>{
  
return (
        <Fragment>
                    <header id='landing-left-header'>
                    <h4>Download our new app</h4> 
                    </header>
                        <div id='landing-app-links-container'>
                        <a>
                            <img src={android} alt='gaawk app android' className='app-link-image'/>
                        </a>
                        <a>
                            <img src={ios} alt='gaawk app ios' className='app-link-image'/>
                        </a>
                        </div>
                        <div id='landing-ad-space'>

                        </div>
        </Fragment>
)
}

export default AdSpace;