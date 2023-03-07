import {ComponentType} from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";


export interface IRoute {
    path: string;
    element: ComponentType;
}

export enum RouterNames {
    LOGIN = '/login',
    EVENT = '/'
}

export const publickRouters = [
    {path: RouterNames.LOGIN, element: Login}
]

export const privatRouters = [
    {path: RouterNames.EVENT, element: Event}
]