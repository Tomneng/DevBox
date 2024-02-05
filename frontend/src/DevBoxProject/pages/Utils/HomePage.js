import React from 'react';
import Header from "../../components/Header";
import {Container} from "react-bootstrap";
import LoginContextCounsumer from "../../contexts/LoginContextCounsumer";

const HomePage = () => {
    return (
        <>
        <Header />
                <div className="container">
                    <h1>Home</h1>
                    <hr />
                    <h2>메인페이지</h2>
                    <LoginContextCounsumer />
                </div>

        </>
    );
};

export default HomePage;