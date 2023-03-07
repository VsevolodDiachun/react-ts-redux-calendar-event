import {EventActionEnum, SetEventAction, SetGuestsAction} from "../event/types";
import {IEvent} from "../../../models/IEvent";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    ActionSetEvent: (payload: IEvent[]): SetEventAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    ActionSetGuest: (payload: IUser[]): SetGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    ActionFetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserService.getUsers();
            console.log(response);
            dispatch(EventActionCreators.ActionSetGuest(response.data));
        } catch (e) {
            console.log(e)
        }
    },
    ActionCreateEvent: (event: IEvent) => (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.ActionSetEvent(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e);
        }
    },
    ActionFetchEvent: (username: string) => (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
            dispatch(EventActionCreators.ActionSetEvent(currentUserEvents))
        } catch (e) {
            console.log('Error in ActionFetchEvent');
        }
    }
}