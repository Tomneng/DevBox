import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Container} from 'react-bootstrap';
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import MyPage from "./pages/MyPage";
import AboutPage from "./pages/AboutPage";
import LoginContextProvider from "./contexts/LoginContextProvider";
import AdminPage from "./pages/AdminPage";

const DevBoxApp = () => {
    return (
        <>
            <Container>
                <LoginContextProvider>
                    <Routes>
                        <Route path='/' Component={HomePage}></Route>
                        <Route path='/register' Component={RegisterPage}></Route>
                        <Route path='/login' Component={LoginPage}></Route>
                        <Route path='/mypage' Component={MyPage}></Route>
                        <Route path='/about' Component={AboutPage}></Route>
                        <Route path='/admin' Component={AdminPage}></Route>
                    </Routes>
                </LoginContextProvider>
            </Container>
        </>
    );
};

export default DevBoxApp;