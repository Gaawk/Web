// import currentUser from "../store/reducers/currentUser";
import { configureStore } from "../store";
import { logout } from "../store/actions/auth";

export function loadCurrentUser(store, setCurrentUser, isAuthenticated) {
  if (localStorage.currentUser) {
    console.log(isAuthenticated);
    try {
      if (Number(localStorage.getItem("tabsCount"))) {
        console.log("greateR");
        store.dispatch(
          setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
        );
        sessionStorage.setItem("userLoggedIn", "true");
      }
      if (sessionStorage.getItem("userLoggedIn")) {
        store.dispatch(
          setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
        );
      } else {
        //when still logged in but change page/tab-- keep user logged in

        if (localStorage.keepLoggedIn === "true") {
          store.dispatch(
            setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
          );
        } else {
          store.dispatch(setCurrentUser({}));
          localStorage.clear();
        }
      }
    } catch (e) {
      store.dispatch(setCurrentUser({}));
    }
  }
}

// export function loadCurrentUser(store, setCurrentUser) {
//   if (localStorage.currentUser) {
//     try {
//       store.dispatch(
//         setCurrentUser(JSON.parse(localStorage.getItem("currentUser")))
//       );
//     } catch (e) {
//       store.dispatch(setCurrentUser({}));
//     }
//   }
// }

export const addWindow = () => {
  if (localStorage.getItem("tabsCount")) {
    let openedWindows = Number(localStorage.getItem("tabsCount"));
    localStorage.setItem("tabsCount", (openedWindows + 1).toString());
  } else {
    localStorage.setItem("tabsCount", 1);
  }
};

export const removeWindow = () => {
  if (localStorage.getItem("tabsCount")) {
    if (Number(localStorage.getItem("tabsCount")) > 1) {
      let openedWindows = Number(localStorage.getItem("tabsCount"));
      localStorage.setItem("tabsCount", (openedWindows - 1).toString());
    } else {
      localStorage.removeItem("tabsCount");
    }
  }
};
