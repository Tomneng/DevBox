import React from 'react';
import './ErrorLibPage.css'
import {Link} from "react-router-dom";
import Header from "../../components/Header";

const ErrorLibPage = () => {
    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="errcontainer">
                    <div className="title">ERROR LIBRARY</div>
                    <div className="line">
                        <div className="selectors"><Link to="/errorLib/java">JAVA</Link></div>
                        <div className="selectors"><Link to="/errorLib/react">React</Link></div>
                        <div className="selectors"><Link to="/errorLib/javaScript">JavaScript</Link></div>
                        <div className="selectors"><Link to="/errorLib/mySql">MySQL</Link></div>
                        <div className="selectors"><Link to="/errorLib/java">JAVA</Link></div>
                        <div className="selectors"><Link to="/errorLib/java">JAVA</Link></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorLibPage;