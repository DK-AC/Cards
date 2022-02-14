import {useAppSelector} from "../store";

import {Navigate, useLocation} from "react-router-dom";
import {PATH} from "../../ui/Routes/Routes";

//оборачиваем страницы , в которых нужна логинизация нпр:export default compose(withAuthRedirect)(Profile);

export function withAuthRedirect<T>(Component: React.ComponentType<T>) {

    const RedirectComponent =({...restProps})=>{
        const location= useLocation()
        const isLoggedIn= useAppSelector<boolean>(state=> state.Login.isLogged)

        if (!isLoggedIn) return <Navigate to= {PATH.LOGIN_PAGE} state={{from:location}} />
        return <Component {...restProps as T}/>
    }
    return RedirectComponent;
}