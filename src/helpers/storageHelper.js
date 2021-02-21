

export function getLocalStorage(){
    return localStorage.getItem('jwtToken')
}

export function setLocalStorage(value){
    return localStorage.setItem('jwtToken', value)
}