import {NavLink, useNavigate} from "react-router-dom";
import style from "./Header.module.css";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {PATH} from "../../Routes/Routes";
import {logoutTC} from "../../../bll/reducers/loginReducer";
import {clearState, restoreState} from "../../../dal/localStorage/localStorage";
import Button from "@mui/material/Button";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PortraitIcon from '@mui/icons-material/Portrait';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

export const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    //let isLoggedIn = useAppSelector<boolean>(state => state.Login.isLogged)
    let isLoggedIn = restoreState('isLogged', false)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
        navigate(PATH.LOGIN_PAGE)
        clearState('isLogged', false)
    }, [isLoggedIn])

  const BackToStartPage = () => {
    navigate(PATH.START_PAGE)
  }

    return (
        <header className={style.header}>
            <h1 className={style.title} onClick={BackToStartPage}>LearnCards</h1>
            <div className={style.itemsWrapper}>
                <MenuItem path={PATH.PACKS_TABLE_PAGE} iconName={'CollectionsOutlinedIcon'} name={'Pack lists'}/>
                <MenuItem path={PATH.PROFILE_PAGE} iconName={'PortraitIcon'} name={'Profile page'}/>
                <MenuItem path={PATH.PROFILE_INFO_PAGE} iconName={'PermIdentityIcon'} name={'ProfileInfo'}/>
            </div>
            <div className={!isLoggedIn ? style.hidden : ''}>
               {/* <div>*/}
                <Button variant={"outlined"} color={'secondary'} onClick={logoutHandler}>Logout</Button>
                {/*<Button variant={"outlined"} color={'secondary'} onClick={loginHandler}>Login</Button>*/}
            </div>
        </header>
    );
};

type menuItemType = {
    path: string
    iconName: 'PermIdentityIcon' | 'PortraitIcon' | 'CollectionsOutlinedIcon'
    name: string
}

const MenuItem = ({path, name, iconName}: menuItemType) => {

    return (
        <NavLink className={({isActive}) => (isActive ? style.activeRoute : style.item)}
                 to={path}>
            {iconName == 'PermIdentityIcon' && <PermIdentityIcon/>}
            {iconName == 'PortraitIcon' && <PortraitIcon/>}
            {iconName == 'CollectionsOutlinedIcon' && <CollectionsOutlinedIcon/>}
            {name}
        </NavLink>
    )
}