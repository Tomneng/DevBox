import React, {useEffect, useState} from 'react';
import Header from "../../../components/Header";
import * as auth from "../../../apis/auth"
import {useParams} from "react-router-dom";
import "../CSS/MyDocDetail.css"

const MyDocDetail = () => {

    const [myDoc, setMyDoc] = useState({});

    let {id} = useParams();

    // useEffect( () => {
    //     let response;
    //     let data;
    //
    //     try {
    //         response =  auth.getmyDoc(id);
    //     }catch (error){
    //         console.log(error);
    //     }
    //
    //     data = response.data;
    //     setMyDoc(data);
    // }, []);


    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="myDoccontainer">
                    <h1>제목</h1>
                    <p>이 문서는 위키피디아 느낌의 간단한 예제입니다.</p>

                    <h2>내용</h2>
                    <p>
                        이곳에 내용을 작성합니다.{' '}
                        <a href="#">링크</a>
                        나 목록도 추가할 수 있습니다.
                    </p>

                    <ul>
                        <li>항목 1</li>
                        <li>항목 2</li>
                        <li>항목 3</li>
                    </ul>

                    <img src="https://via.placeholder.com/300" alt="Placeholder Image"/>

                    <h2>코드 블록</h2>
                    <pre>
          <code>
            {`@Transactional
public ResponseEntity<?> getMyDoc(Long id){
    return new ResponseEntity<>(myDocRepository.findById(id), HttpStatus.OK);
}`}
          </code>
        </pre>
                </div>
            </div>

        </>
    );
};

export default MyDocDetail;