import React, {FC, useState} from 'react';
import {Button, Form, Input, Row} from "antd";
import {rules} from "../utils/rules";
import {useAction} from "../hooks/useAction";
import {useTypedSelector} from "../hooks/useTypedSelector";

const LoginForm: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {logIn} = useAction();
    const submit = () => {
        logIn(username, password)
    }

    const {isLoading, isError} = useTypedSelector(state => state.authReducer);


    return (
        <Form
            onFinish={submit}
        >
            {isError && <div style={{color: 'red'}}>
                {isError}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
                >
                <Input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Row justify='end'>
                    <Input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        type={'password'}
                    />
                </Row>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;