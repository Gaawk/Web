import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { BrowserRouter as Router } from "react-router-dom";

import Main from "./components/Main/Main";
import NavBar from "./components/NavBar/NavBar";
import Alert from "./components/Alert/Alert";
import Footer from "./components/Footer/Footer.js";
import { loadCurrentUser, addWindow, removeWindow } from "./helpers/hydrate";
import { setAuthorizationToken, setCurrentUser } from "./store/actions/auth";
import "./App.css";
import setAlert from "./store/actions/alert";

const store = configureStore();
const isAuthenticated = configureStore().getState().currentUser.isAuthenticated;
loadCurrentUser(store, setCurrentUser, isAuthenticated);

function App() {
  //TO COUNT TAB/WINDOWS THAT THE APP IS CURRENTLY RUNNING ON IN A BROWSER( adding a new browser )
  useEffect(() => {
    window.addEventListener("load", addWindow);
    return () => {
      window.removeEventListener("load", addWindow);
    };
  }, []);

  //TO COUNT TAB/WINDOWS THAT THE APP IS CURRENTLY RUNNING ON IN A BROWSER( remove a browser )
  useEffect(() => {
    window.addEventListener("beforeunload", removeWindow);
    return () => {
      window.removeEventListener("beforeunload", removeWindow);
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <div className="content">
            <NavBar />
            <Alert></Alert>
            <Main />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
