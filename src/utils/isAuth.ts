import { getFromStorage } from "./useLocaleStorage";

export function isAuth(){
    const user = getFromStorage('user')
    return user ? true : false
    
}