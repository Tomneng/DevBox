import React from 'react';
import './ErrorLibPage.css'
import {Link} from "react-router-dom";
import Header from "../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";

const ErrorLibPage = () => {
    return (

            <div className="fullPage">
                <Header/>
                <div className="errcontainer">
                    <div className="title">MY LIBRARY</div>
                    <div className="line">
                        <input type="text" className="search-input" placeholder="검색어를 입력하세요"/>
                        <button className="search-button"><FontAwesomeIcon icon={faArrowUp} /></button>
                    </div>
                </div>
            </div>

    );
};

export default ErrorLibPage;