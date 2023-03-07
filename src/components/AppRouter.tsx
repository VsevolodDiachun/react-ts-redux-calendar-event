import React, {FC} from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {privatRouters, publickRouters, RouterNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter: FC = () => {
    const { isAuth } = useTypedSelector(state => state.authReducer)

    return (
        isAuth ?
            <Routes>
                {privatRouters.map(route =>
                    <Route path={route.path}
                           element={<route.element />}
                           key={route.path}
                    />
                )}
                <Route path='*' element={<Navigate to={RouterNames.EVENT} replace/>}/>
            </Routes>
            :
            <Routes>
                {publickRouters.map(route =>
                    <Route path={route.path}
                           element={<route.element />}
                           key={route.path}
                    />
                )}
                <Route path='*' element={<Navigate to={RouterNames.LOGIN} replace/>}/>
            </Routes>
    );
};

export default AppRouter;