import React from 'react';
import Header from "../components/Header";
import {Container} from "react-bootstrap";
import LoginContextCounsumer from "../contexts/LoginContextCounsumer";

const AboutPage = () => {
    return (
        <>
        <Header />
                <div className="container">
                    <h1>About</h1>
                    <hr />
                    <h2>소개페이지</h2>
                    <LoginContextCounsumer/>
                </div>

        </>
    );
};

export default AboutPage;