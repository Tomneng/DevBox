import React, {useState} from 'react';
import {Button, Col, Container, Form, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {faCss3Alt, faHtml5, faJava, faPython, faReact, faSquareJs, faSwift} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faC, faDatabase} from "@fortawesome/free-solid-svg-icons";

import CLogo from "../../components/image/c.png"
import CPPLogo from "../../components/image/cpp.png"
import CSHARPLogo from "../../components/image/csharp.png"
import CSSLogo from "../../components/image/css.png"
import HTMLLogo from "../../components/image/html.png"
import JAVALogo from "../../components/image/java.png"
import JSLogo from "../../components/image/javascript.png"
import PYTHONLogo from "../../components/image/python.png"
import REACTLogo from "../../components/image/react.png"


const ShareWrite = () => {

    const navigate = useNavigate();
    const [share, setShare] = useState({
        sid: '',
        stitle: '',
        scontent: '',
        slanguage: '',
        spublic: 'PUBLIC',
        sdescription: '',
    });

    // 빈 배열을 만든후 이 배열에 체크된 언어만 넣고 이 배열을 가지고 언어 아이콘을 보여줄 계획
    // const [language, setLanguage] = useState([]);

    const changeValue = (e) => {
        const {name, value, type, checked} = e.target;

        setShare((prevShare) => {
            if (type === 'checkbox') {

                return {
                    ...prevShare,
                    [name]: checked
                        ? prevShare[name].length > 0
                            ? `${prevShare[name]},${value}`
                            : value
                        : prevShare[name]
                            .split(',')
                            .filter((item) => item !== value)
                            .join(',')
                };
            } else {
                // 그 외의 경우 value 값을 사용
                return {
                    ...prevShare,
                    [name]: value,
                };
            }
        });
    };


    const submitShare = (e) => {
        e.preventDefault();

        //  POST request
        fetch('http://localhost:8080/share/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8', //  json 으로  리퀘스트
            },
            body: JSON.stringify(share),
        })
            .then((response) => {
                console.log(`response`, response);
                if (response.status === 201) {
                    // 201 CREATED 인 경우 성공
                    return response.json();
                } else {
                    console.log(response)
                    return null;
                }
            })
            .then((data) => {
                if (data !== null) {
                    console.log(`check! 작석완료`, data);
                    navigate(`/detail/${data.sid}`); //  이동
                } else {
                    console.log(data)
                    alert('실패!!!  뚜두둥 뚜두둥');
                }
            });
    }
    return (
        <Container>
            <h2>Share</h2>
            <hr/>

            <Form onSubmit={submitShare}>
                {/* 공개 여부 */}
                <Form.Group className={'d-flex gap-4'}>
                    <Form.Label>공개 여부 : </Form.Label>

                    <Form.Check
                        type={"radio"}
                        label={"Public"}
                        id={"public"}
                        name={"spublic"}
                        value={"PUBLIC"}
                        onChange={changeValue}
                        defaultChecked={"PUBLIC"}/>
                    {/*  작성시 기본값 true  */}

                    {/*checked 속성은 share.spublic의 값에 따라 설정됩니다.
만약 share.spublic이 문자열 'true'와 같다면, 라디오 버튼은 초기에 선택된 상태가 되고,
그렇지 않으면 선택되지 않은 상태가 됩니다.*/}

                    <Form.Check
                        type={"radio"}
                        label={"Private"}
                        id={"Private"}
                        name={"spublic"}
                        value={"PRIVATE"}
                        onChange={changeValue}/>

                </Form.Group>

                {/* 사용 언어 태그 */}

                <Form.Group>
                    <Form.Label>사용 언어</Form.Label>
                    <Col className={"d-flex gap-3 flex-wrap justify-content-start"}>

                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"PYTHON"}
                            label={"PYTHON"}
                            onChange={changeValue}
                        />

                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"JAVA"}
                            label={"JAVA"}
                            onChange={changeValue}
                        />

                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"BASICC"}
                            label={"C"}
                            onChange={changeValue}
                        />

                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"C++"}
                            label={"C++"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"C#"}
                            label={"C#"}
                            onChange={changeValue}
                        />


                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"HTML"}
                            label={"HTML"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"CSS"}
                            label={"CSS"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"JS"}
                            label={"JS"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"REACT"}
                            label={"REACT"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"GO LANG"}
                            label={"GO LANG"}
                            onChange={changeValue}
                        />


                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"TYPE SCRIPT"}
                            label={"TYPE SCRIPT"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"SQL"}
                            label={"SQL"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"KOTLIN"}
                            label={"KOTLIN"}
                            onChange={changeValue}
                        />
                        <Form.Check
                            type={"checkbox"}
                            name={"slanguage"}
                            value={"SWIFT"}
                            label={"SWIFT"}
                            onChange={changeValue}
                        />
                    </Col>
                </Form.Group>

                {/* 사용 언어 아이콘*/}
                <div>
                    {share.slanguage.includes("PYTHON") && <Image src={PYTHONLogo}/>}
                    {share.slanguage.includes("JAVA") && <Image src={JAVALogo}/>}
                    {share.slanguage.includes("BASICC") && <Image src={CLogo}/>}
                    {share.slanguage.includes("C++") && <Image src={CPPLogo}/>}
                    {share.slanguage.includes("C#") && <Image src={CSHARPLogo}/>}
                    {share.slanguage.includes("HTML") && <Image src={HTMLLogo}/>}
                    {share.slanguage.includes("CSS") && <Image src={CSSLogo}/>}
                    {share.slanguage.includes("JS") && <Image src={JSLogo}/>}
                    {share.slanguage.includes("REACT") && <Image src={REACTLogo}/>}
                    {share.slanguage.includes("SQL") && <FontAwesomeIcon icon={faDatabase}/>}
                    {share.slanguage.includes("SWIFT") && <FontAwesomeIcon icon={faSwift}/>}
                </div>

                {/*  글 제목 입력 란  */}
                <Form.Group>
                    <Form.Label>제목 : </Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"제목 입력"}
                        onChange={changeValue}
                        name={"stitle"}
                        required/>
                </Form.Group>

                {/* 글 간략 설명*/}
                <Form.Group>
                    <Form.Label>간략 설명 :</Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"간략설명"}
                        onChange={changeValue}
                        name={"sdescription"}
                        required/>
                </Form.Group>

                {/* 글 내용 입력란 */}
                <Form.Group>
                    <Form.Label>코드 내용 :</Form.Label>
                    <Form.Control
                        type={"text"}
                        placeholder={"내용 입력"}
                        onChange={changeValue}
                        name={"scontent"}
                        required/>
                </Form.Group>

                {/* 코드 사진 첨부 */}

                <div className={'mt-3'}>
                    <Button type={"submit"}>나눔 하기</Button>
                    <Link className='btn btn-outline-dark ms-2' to="/list">목록</Link>
                </div>
            </Form>
        </Container>
    );
};

export default ShareWrite;