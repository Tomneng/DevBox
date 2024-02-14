import React, {useEffect, useState} from 'react';
import '../CSS/ErrorLibPage.css'
import {Link, useSearchParams} from "react-router-dom";
import Header from "../../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import * as auth from '../../../apis/auth'
import TableCells from "../components/TableCells";
import Pagination from "../components/Pagination";

const ErrorLibPage = () => {
    const [myDocs, setMyDocs] = useState([])
    const [totalItems, setTotalItems] = useState(0);
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") === null ? 1 : searchParams.get("page");
    const [keywords, setKeywords] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);

    const getDocs = async () =>{
        let data
        let response
        let titles
        try {
            response = await auth.getDocs(page)
            titles = await auth.getKeyWords();
        } catch (error) {
            console.log(`error : ${error}`);
            console.log(`status : ${response.status}`);
            return;
        }
        data = response.data
        setTotalItems(data.cnt) // 페이지 총 갯수
        setMyDocs(data.myDocList) // 슬라이스 된 페이지
        let titlearray = []
        for (let i = 0; i < titles.data.length; i++){
            titlearray.push(titles.data[i].title)
        }
        setKeywords(titlearray);
        console.log(titlearray)
    }

    useEffect( () => {
        getDocs();
    }, [page]);

    useEffect(() => {
        // 입력이 멈춘 후 300ms 이후에 자동완성 키워드를 찾아서 표시
        const timeoutId = setTimeout(() => {
            if (searchText !== null && searchText !== ""){
            const suggestions = keywords.filter((keyword) => keyword.includes(searchText));
            setSuggestedKeywords(suggestions);
            }else {
                setSuggestedKeywords([]);
            }
        }, 300);

        // Cleanup 함수: 이펙트가 재실행될 때 이전 타이머를 제거하여 중복 실행을 방지
        return () => clearTimeout(timeoutId);
    }, [searchText, keywords]);

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="errcontainer">
                    <div className="title">MY LIBRARY</div>
                    <div className="line">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="검색어를 입력하세요"
                            value={searchText}
                            onChange={handleSearchInputChange}
                        />
                        <button className="search-button"><FontAwesomeIcon icon={faArrowUp}/></button>
                    </div>
                    {suggestedKeywords.length > 0 && (
                        <ul id="keywordsContainer">
                            {suggestedKeywords.map((keyword) => (
                                <li key={keyword} className="keywordsItems">
                                    <Link to={`/?search=${keyword}`}>{keyword}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="table-container">
                        <div className="table-header">
                            <div className="table-cell">번호</div>
                            <div className="table-cell">언어</div>
                            <div className="table-cell">제목</div>
                            <div className="table-cell">작성일시</div>
                            <div className="table-cell">열람 횟수</div>
                        </div>
                        {myDocs.map((myDoc, index) => (
                                <TableCells key={myDoc.docId} myDoc={myDoc} />
                        ))}
                    </div>
                        <Pagination currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1} totalItems={totalItems} pageCount={5} itemCountPerPage={20}/>
                </div>
            </div>
        </>
    );
};

export default ErrorLibPage;