import React from 'react';
import './ErrorLibPage.css'
import {Link} from "react-router-dom";
import Header from "../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";

const ErrorLibPage = () => {
    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="errcontainer">
                    <div className="title">MY LIBRARY</div>
                    <div className="line">
                        <input type="text" className="search-input" placeholder="검색어를 입력하세요"/>
                        <button className="search-button"><FontAwesomeIcon icon={faArrowUp}/></button>
                    </div>
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-cell">번호</div>
                            <div className="table-cell">언어</div>
                            <div className="table-cell">제목</div>
                            <div className="table-cell">작성일시</div>
                            <div className="table-cell">참조 중</div>
                        </div>
                        <div className="table-row">
                            <div className="table-cell">1</div>
                            <div className="table-cell">한국어</div>
                            <div className="table-cell">긴 제목이 여기에 들어갈 것입니다. 텍스트가 너무 길어지면 ...으로 표시됩니다.</div>
                            <div className="table-cell">2024-02-06</div>
                            <div className="table-cell">참조 없음</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorLibPage;