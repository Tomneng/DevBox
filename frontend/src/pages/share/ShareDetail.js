import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Container} from "react-bootstrap";

const ShareDetail = () => {

    const navigate = useNavigate();
    let {sid} = useParams();

    const [share, setShare] = useState({
        sid: '',
        stitle: '',
        scontent: '',
        spublic: '',
    });
    useEffect(() => {
        fetch('http://localhost:8080/share/detail/' + sid)
            .then(response => response.json())
            .then(data => setShare(data));
    }, []);
    const deletePost = () => {
        if (!window.confirm('삭제 할랍니꺼')) return;
        fetch('http://localhost:8080/share/delete/' + sid, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data === 1) {
                    alert('삭제 성공');
                    navigate('/list'); //  삭제 성공후 '목록' 화면으로
                } else {
                    alert('삭제 실패');
                }
            });
    };
    const updatePost = () => {
        navigate('/update/' + sid);
    };

  return (
    <Container>

        <h2>조회 : {share.stitle}</h2>

<hr/>


        <div className="d-flex">
            <Button variant='outline-dark ' onClick={updatePost}>수정</Button>
            <Button variant='outline-danger' className=' ms-2' onClick={deletePost}>삭제</Button>
            <Link className='btn btn-outline-dark ms-2' to="/write">작성</Link>
            <Link className='btn btn-outline-dark ms-2' to="/list">목록</Link>
        </div>
    </Container>
  );
};

export default ShareDetail;