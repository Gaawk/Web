import currentUser from "../store/reducers/currentUser";


export function loadCurrentUser(store, setCurrentUser){
    if(localStorage.currentUser){
        try{
          if(sessionStorage.getItem('keepLoggedIn')){
                store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem('currentUser'))));
        }else{
                    if(localStorage.keepLoggedIn==='true'){

                        store.dispatch(setCurrentUser(JSON.parse(localStorage.getItem('currentUser'))));
                    }else{
                    store.dispatch(setCurrentUser({}))
                    localStorage.clear()
                }
            }
        }catch(e){
            store.dispatch(setCurrentUser({}))
    }
    }
}
    