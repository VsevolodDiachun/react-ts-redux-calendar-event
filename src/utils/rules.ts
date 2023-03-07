import moment, {Moment} from "moment";
import dayjs, {Dayjs} from 'dayjs';

export const rules = {
    required: (message: string = 'Mandatory field!') => ({
        required: true,
        message
    }),
    isDateAfter: (message: string = "You can't create events in the past") => ({
        validator(_: any, value: Dayjs) {
            if (value.isAfter(dayjs())) {
                return Promise.resolve()
            }
            return Promise.reject(new Error(message));
        }
    })
}