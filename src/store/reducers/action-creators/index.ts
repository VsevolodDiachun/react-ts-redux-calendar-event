import * as auth from "./auth";
import * as event from "./event";

export default {
    ...auth.AuthActionCreators,
    ...event.EventActionCreators
}