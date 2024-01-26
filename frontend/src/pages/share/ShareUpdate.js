import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const ShareUpdate = () => {

      let {sid} = useParams();
    const navigate = useNavigate();

    const [share, setShare] = useState({
        sid: '',
        stitle: '',
        scontent: '',
        spublic: '',
        sregDate: '',
        sdescription: '',

    })

    useEffect(() => {
        fetch("http://localhost:8080/share/detail/" + sid)
            .then(response => response.json())
            .then(data => setShare(data)) // ... 사용할 필요없이 덮어쓰기 하면됨
    }, []);

    const changeValue = (e) => {
        setShare({
            ...share,
            [e.target.name]: e.target.value,
        });
    };

    const submitShare = (e) => {
        e.preventDefault(); // 기본 subimt 동작 차단.

        //  PUT request
        fetch('http://localhost:8080/share/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8', //  json 으로  리퀘스트
            },
            body: JSON.stringify(share),
        })
            .then(response => {
                console.log(`response`, response);
                if (response.status === 200) {  //  200
                    // 201 CREATED 인 경우 성공
                    return response.json();
                } else {
                    return null;
                }
            })
            .then(data => {
                if (data !== null) {
                    alert(`CRISTAL 완료`)
                    console.log(`크리스탈 완료`, data);
                    navigate(`/detail/${data.sid}`); //  이동
                } else {
                    alert('실패!!!  뚜두둥 뚜두둥');
                }
            });
    };

    return (
        <Container mt={3}>
            <h2>수정 : {share.stitle}</h2>
            <hr />
            <div className="mb-3 mt-3 clearfix">
                <Row>
                    <Col xs={6} className="d-flex justify-content-start me-2">
                        <span>id: {share.sid}</span>

                        <span className="ms-4">
              작성일: { share.sregDate }

            </span>
                        <span className="me-2">조회수: {share.viewCnt}</span>
                    </Col>
                </Row>
            </div>

            <Form onSubmit={submitShare}>
                {/* 제목 */}
                <Form.Group className="my-3" controlId="formBasicStitle">
                    <Form.Label>제목 :</Form.Label>
                    <Form.Control
                        type="text"
                        value={share.stitle}
                        onChange={changeValue}
                        name={"stitle"}
                    />
                </Form.Group>
                {/* 내용 */}
                <Form.Group className="my-3" controlId="formBasicScontent">
                    <Form.Label>내용 : </Form.Label>
                    <Form.Control
                        type="text"
                        value={share.scontent}
                        onChange={changeValue}
                        name="subject"


                    />
                </Form.Group>
                {/* 공개여부 */}
                <Form.Group className="my-3" controlId="formBasicSpublic">

                        <Form.Label>공개 여부</Form.Label>
                        <Form.Check
                            type={"radio"}
                            label={"Public"}
                            id={"public"}
                            name={"spublic"}
                            value={"true"}
                            checked={share.spublic === 'true'}
                            onChange={changeValue}/>

                        {/*checked 속성은 share.spublic의 값에 따라 설정됩니다.
만약 share.spublic이 문자열 'true'와 같다면, 라디오 버튼은 초기에 선택된 상태가 되고,
그렇지 않으면 선택되지 않은 상태가 됩니다.*/}

                        <Form.Check
                            type={"radio"}
                            label={"Private"}
                            id={"Private"}
                            name={"spublic"}
                            value={"false"}
                            checked={share.spublic === 'false'}
                            onChange={changeValue}/>

                </Form.Group>

                <Button variant="outline-dark" type="submit">
                    작성완료
                </Button>
                <Button variant='outline-dark' className='ms-1' onClick={() => navigate(-1)}>이전으로</Button>
                <Link className="btn btn-outline-dark ms-2" to="/list">
                    목록
                </Link>
            </Form>
        </Container>
    );
};

export default ShareUpdate;