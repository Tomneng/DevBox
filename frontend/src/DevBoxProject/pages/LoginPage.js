import React, {useState} from 'react';
import '../CSS/LoginPage.css'
import Header from "../components/Header";
import {Container} from "react-bootstrap";
import LoginContextCounsumer from "../contexts/LoginContextCounsumer";
import LoginForm from "../components/Login/LoginForm";

const LoginPage = () => {
    return (
        <>
            <Header/>
                <div className="container">
                    <LoginForm/>
                </div>
        </>
    );
};

export default LoginPage;