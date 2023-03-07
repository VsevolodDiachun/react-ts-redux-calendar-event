import React, {FC, useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {ActionFetchGuests, ActionCreateEvent, ActionFetchEvent} = useAction();
    const {guests, events} = useTypedSelector(state => state.eventReducer);
    const {isUser} = useTypedSelector(state => state.authReducer)

    useEffect(() => {
        ActionFetchGuests();
        ActionFetchEvent(isUser.username);
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false);
        ActionCreateEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button onClick={() => setModalVisible(true)}>Add event</Button>
            </Row>
            <Modal
                title='Add event'
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    guests={guests}
                    submit={addNewEvent}
                />
            </Modal>
        </Layout>
    );
};

export default Event;