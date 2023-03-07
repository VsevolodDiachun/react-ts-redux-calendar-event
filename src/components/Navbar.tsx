import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouterNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAction} from "../hooks/useAction";


const Navbar: FC = () => {
    const {isAuth, isUser} = useTypedSelector(state => state.authReducer);
    const {username} = isUser;
    const {logOut} = useAction();
    const navigate = useNavigate();

    return (
        <Layout.Header>
            <Row justify={'end'}>
                {isAuth ?
                    <Menu theme="dark" mode="horizontal" selectable={false} style={{paddingLeft: 36}}>
                        <div style={{color: 'white'}}>{username}</div>
                        <Menu.Item
                            onClick={() => logOut()}
                            key={1}
                        >
                            LogOut
                        </Menu.Item>
                    </Menu>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false} style={{paddingLeft: 36}}>
                        <Menu.Item
                            onClick={() => navigate(RouterNames.LOGIN)}
                            key={2}
                        >
                            LogIn
                        </Menu.Item>
                    </Menu>
                }

            </Row>
        </Layout.Header>
    );
};

export default Navbar;