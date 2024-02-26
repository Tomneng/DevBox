import React from 'react';
import Header from "../../components/Header";
import LoginContextCounsumer from "../../contexts/LoginContextCounsumer";
import "./HomePage.css"

const HomePage = () => {
    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="maincontainer">
                    <section className="category-card" id="codeShare">
                        <div className="homegif"></div>
                    </section>
                    <div className="explanation">
                        <h2>Code Share</h2>
                        <p></p>
                    </div>
                    <section className="category-card" id="devLibrary">
                    </section>
                    <div className="explanation">
                        <h2>Code Share</h2>
                        <p>

                        </p>
                    </div>
                    <section className="category-card" id="profile">
                    </section>
                    <div className="explanation">
                        <h2>Code Share</h2>
                        <p>

                        </p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default HomePage;