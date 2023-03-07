import React, {FC, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {formatDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Dayjs} from 'dayjs';

interface EventFormProps {
    guests: IUser[];
    submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
    const {isUser} = useTypedSelector(state => state.authReducer)
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    } as IEvent);

    const selectDate = (date: Dayjs | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const selectDescription = (text: React.ChangeEvent<HTMLInputElement>) => {
        const newTest = text.target.value;
        if (text) {
            setEvent({...event, description: newTest});
        }
    }

    const submitForm = () => {
        props.submit({...event, author: isUser.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Description event"
                name="description"
                rules={[rules.required()]}
            >
                <Input onChange={(e) => selectDescription(e)} value={event.description} />
            </Form.Item>
            <Form.Item
                label="Date event"
                name="date"
                rules={[rules.required(), rules.isDateAfter()]}
            >
                <DatePicker onChange={(date) => selectDate(date)} style={{marginLeft: 43}}/>
            </Form.Item>
            <Form.Item
                label="Select guest"
                name="select"
                rules={[rules.required()]}
            >
                <Select
                    style={{ width: 120 }}
                    onChange={(guest: string) => setEvent({...event, guest})}
                >
                    {props.guests.map(guest =>
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row justify={"end"}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm;