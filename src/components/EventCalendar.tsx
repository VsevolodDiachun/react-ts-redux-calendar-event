import React, {FC} from 'react';
import {Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import type { Dayjs } from 'dayjs'
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props) => {

    const dateCellRender = (value: Dayjs) => {
        const formattedDate = formatDate(value.toDate())
        const currentDateEvents = props.events.filter(ev => ev.date === formattedDate)

        return (
            <div>
                {currentDateEvents.map((ev, index) =>
                    <div key={index}>
                        {ev.description}
                    </div>
                )}
            </div>
        )
    };

    return (
        <Calendar dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;