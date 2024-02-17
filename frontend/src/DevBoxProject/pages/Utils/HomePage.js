import React from 'react';
import Header from "../../components/Header";
import LoginContextCounsumer from "../../contexts/LoginContextCounsumer";
import TableCells from "../errorLib/components/TableCells";
import Pagination from "../errorLib/components/Pagination";
import "./HomePage.css"

const HomePage = () => {
    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="maincontainer">
                    <section className="category-card" id="codeShare">
                        <h2>Code Share</h2>
                        <p>Discover and share code snippets with the community.</p>
                    </section>
                    <div className="explanation">
                        <h2>Code Share</h2>
                        <p>

                        </p>
                    </div>
                    <section className="category-card" id="devLibrary">
                        <h2>Dev Library</h2>
                        <p>Explore a collection of development resources in the library.</p>
                    </section>
                    <div className="explanation">
                        <h2>Code Share</h2>
                        <p>

                        </p>
                    </div>
                    <section className="category-card" id="profile">
                        <h2>Profile</h2>
                        <p>Manage your profile and personal information.</p>
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