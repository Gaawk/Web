import React,{useEffect, useState} from 'react';
import {Provider} from "react-redux";
import {configureStore} from "./store";
import { BrowserRouter as Router } from 'react-router-dom';

import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Alert from './components/Alert/Alert';
import Footer from './components/Footer/Footer.js';
import { loadCurrentUser } from './helpers/hydrate';
import { setAuthorizationToken, setCurrentUser } from './store/actions/auth';
import './App.css';
import setAlert from './store/actions/alert';

const store = configureStore();


loadCurrentUser(store, setCurrentUser);

function App() {

  return (
	  <Provider store={store}>
		<Router>
			<div className="App">
					<div className='content'>
					<NavBar/>
					<Alert></Alert>
					<Main/>
					</div>
					<Footer/>
			</div>
		  </Router>
	  </Provider>
  );
}

export default App;