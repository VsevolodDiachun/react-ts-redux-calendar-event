import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import ActionCreator from "../store/reducers/action-creators";
import {AppDispatch} from "../store";

export const useAction = () => {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(ActionCreator, dispatch)
}