import { Dispatch } from "redux";
import {setAppErrorAC, setAppStatusAC} from "../bll/reducers/appReducer";



export const handlerAppError = (err: any, dispatch: Dispatch) => {
    const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
    dispatch(setAppErrorAC(error));
    dispatch(setAppStatusAC('failed'));
};