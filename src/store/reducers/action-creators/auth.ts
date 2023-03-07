import {AppDispatch} from "../../index";
import {IUser} from "../../../models/IUser";
import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "../auth/types";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    ActionAuth: (payload: boolean): SetAuthAction => ({type: AuthActionEnum.SET_AUTH, payload}),
    ActionLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionEnum.SET_IS_LOADING, payload}),
    ActionUser: (payload: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload}),
    ActionError: (payload: string): SetErrorAction => ({type: AuthActionEnum.SET_ERROR, payload}),
    logIn: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.ActionLoading(true));
            setTimeout(async () => {
                const response = await UserService.getUsers();
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                console.log(mockUser);
                if (mockUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.ActionUser(mockUser))
                    dispatch(AuthActionCreators.ActionAuth(true))
                    console.log('Success')
                } else {
                    dispatch(AuthActionCreators.ActionError('Wrong login or password'))
                    console.log('Wrong login or password')
                }
                dispatch(AuthActionCreators.ActionLoading(false))
            }, 1000)

        } catch (e) {
            dispatch(AuthActionCreators.ActionError('Error login'));
        }
    },
    logOut: () => (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.ActionUser({} as IUser))
        dispatch(AuthActionCreators.ActionAuth(false))
    }
}