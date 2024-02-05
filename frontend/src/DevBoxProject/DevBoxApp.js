import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Container} from 'react-bootstrap';
import LoginPage from "./pages/Utils/LoginPage";
import RegisterPage from "./pages/Utils/RegisterPage";
import HomePage from "./pages/Utils/HomePage";
import MyPage from "./pages/Utils/MyPage";
import AboutPage from "./pages/AboutPage";
import LoginContextProvider from "./contexts/LoginContextProvider";
import AdminPage from "./pages/AdminPage";
import ErrorLibPage from "./pages/errorLib/ErrorLibPage";

const DevBoxApp = () => {
    return (
        <>
                <LoginContextProvider>
                    <Routes>
                        <Route path='/' Component={HomePage}></Route>
                        <Route path='/register' Component={RegisterPage}></Route>
                        <Route path='/login' Component={LoginPage}></Route>
                        <Route path='/mypage' Component={MyPage}></Route>
                        <Route path='/about' Component={AboutPage}></Route>
                        <Route path='/admin' Component={AdminPage}></Route>
                        <Route path='/errorLib' Component={ErrorLibPage}></Route>
                    </Routes>
                </LoginContextProvider>
        </>
    );
};

export default DevBoxApp;