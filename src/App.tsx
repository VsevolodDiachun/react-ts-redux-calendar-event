import React, {FC, useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import {useAction} from "./hooks/useAction";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {IUser} from "./models/IUser";

const App:FC = () => {
    const {ActionUser, ActionAuth} = useAction();
    useEffect(() => {
        if(localStorage.getItem('auth')){
            ActionUser({username: localStorage.getItem('username' || '')} as IUser);
            ActionAuth(true);
            console.log("SUCCESS")
        } else {
            console.log("ERROR")
        }
    })

  return (
    <Layout>
        <Navbar/>
        <Layout.Content>
            <AppRouter/>
        </Layout.Content>
    </Layout>
  );
}

export default App;
