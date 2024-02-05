import React, {useState} from 'react';
import './LoginPage.css'
import Header from "../../components/Header";
import {Container} from "react-bootstrap";
import LoginContextCounsumer from "../../contexts/LoginContextCounsumer";
import LoginForm from "../../components/Login/LoginForm";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <>
            <div className="h1">
                <Link to="/">DEV BOX</Link>
            </div>
                <div className="container">
                    <LoginForm/>
                </div>
        </>
    );
};

export default LoginPage;