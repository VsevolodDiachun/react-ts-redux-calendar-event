import {IUser} from "../../../models/IUser";

export interface AuthState {
    isAuth: boolean;
    isUser: IUser;
    isLoading: boolean;
    isError: string;
}

export enum AuthActionEnum {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_ERROR = 'SET_ERROR',
    SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface SetAuthAction {
    type: AuthActionEnum.SET_AUTH;
    payload: boolean;
}

export interface SetIsLoadingAction {
    type: AuthActionEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetUserAction {
    type: AuthActionEnum.SET_USER;
    payload: IUser;
}

export interface SetErrorAction {
    type: AuthActionEnum.SET_ERROR;
    payload: string;
}

export type AuthAction = SetAuthAction | SetIsLoadingAction | SetUserAction | SetErrorAction;