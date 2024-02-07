import React, {useEffect, useState} from 'react';
import '../CSS/ErrorLibPage.css'
import {Link} from "react-router-dom";
import Header from "../../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import * as auth from '../../../apis/auth'
import TableCells from "../components/TableCells";

const ErrorLibPage = () => {

    const [myDocs, setMyDocs] = useState([]);

    useEffect(async () => {
        let response;
        let data;

        try {
            response = await auth.getLibList()
        } catch (error) {
            console.log(`error : ${error}`);
            console.log(`status : ${response.status}`);
            return;
        }
        data = response.data
        setMyDocs(data);
    }, []);


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
                            <div className="table-cell">열람 횟수</div>
                        </div>
                        {myDocs.map(myDoc => <TableCells key={myDoc.id} myDoc={myDoc}/>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ErrorLibPage;