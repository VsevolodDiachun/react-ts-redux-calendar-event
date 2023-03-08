import moment, {Moment} from "moment";

export const rules = {
    required: (message: string = 'Mandatory field!') => ({
        required: true,
        message
    }),
    isDateAfter: (message: string = "You can't create events in the past") => ({
        validator(_: any, value: Moment) {
            const valueDate = value.format('DD.MM.YYYY HH:mm');
            const momentDate = moment().format('DD.MM.YYYY HH:mm');
            if (moment(valueDate).isSameOrAfter(momentDate)) {
                return Promise.resolve()
            }
            return Promise.reject(new Error(message));
        }
    })
}