import {AuthAction, AuthActionEnum, AuthState} from "./types";
import {IUser} from "../../../models/IUser";

const initialState:AuthState = {
    isAuth: false,
    isLoading: false,
    isUser: {} as IUser,
    isError: ''
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionEnum.SET_AUTH:
            return {...state, isLoading:  false, isAuth: action.payload};
        case AuthActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload};
        case AuthActionEnum.SET_USER:
            return {...state, isUser: action.payload};
        case AuthActionEnum.SET_ERROR:
            return {...state, isLoading: false, isError: action.payload}
        default:
            return state;
    }
};

