import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const Detail = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        number: '',
        age: '',
        degree: '',
        csDegree: '',
        skills: '',
        job: '',
        experience: '',
        projects: '',
        licenses: '',
        technicalSkills: '',
        portfolio: '',
        profilePic: null,
        createdAt: '', // 추가된 부분
    });

    useEffect(() => {
        fetch(`http://localhost:8080/profile/detail/${id}`)
            .then((response) => response.json())
            .then((data) => setProfile(data));
    }, [id]);

    const deleteProfile = () => {
        if (!window.confirm('삭제 할까요?')) return;
        fetch(`http://localhost:8080/profile/delete/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data === 1) {
                    alert('삭제 완료!');
                    navigate('/');
                } else {
                    alert('삭제 실패!');
                }
            });
    };

    const updateProfile = () => {
        navigate(`/update/${id}`);
    };

    // createdAt 값이 있는 경우에만 시간을 표시
    const time = profile.createdAt
        ? new Date(profile.createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Seoul',
        })
        : null;

    let profilePicPreview;

    return (
        <Container className="mt-3">
            <div className="row">
                <h2 className="display06">이력서 작성</h2>
                <hr />
                <div className="col-md-6">
                    <Alert variant="light" className="d-flex justify-content-between">
                        <span>Id : {id}</span>
                        <span>{time && `${time} 작성`}</span>
                    </Alert>
                </div>
                <section>
                    {profilePicPreview && (
                        <img
                            src={URL.createObjectURL(profile.profilePic)}
                            style={{ maxWidth: '100%', height: '100px', display: 'block', marginTop: '10px' }}
                            alt="프로필 미리보기"
                        />
                    )}
                    <div className="mt-3">
                        <h5>이름</h5>
                        <Form.Control type="text" readOnly value={profile.name} />
                    </div>
                    <div className="mt-3">
                        <h5>전화번호</h5>
                        <Form.Control type="text" readOnly value={profile.number} />
                    </div>
                    <div className="mt-3">
                        <h5>나이</h5>
                        <Form.Control type="text" readOnly value={profile.age} />
                    </div>
                    <div className="mt-3">
                        <h5>학력</h5>
                        <Form.Control type="text" readOnly value={profile.degree} />
                    </div>
                    <div className="mt-3">
                        <h5>전공자 유무</h5>
                        <Form.Control type="text" readOnly value={profile.csDegree} />
                    </div>
                    <div className="mt-3">
                        <h5>기술스택</h5>
                        <Form.Control type="text" readOnly value={profile.skills} />
                    </div>
                    <div className="mt-3">
                        <h5>기술능력</h5>
                        <Form.Control type="text" readOnly value={profile.technicalSkills} />
                    </div>
                    <div className="mt-3">
                        <h5>경력</h5>
                        <Form.Control type="text" readOnly value={profile.experience} />
                    </div>
                    <div className="mt-3">
                        <h5>직업</h5>
                        <Form.Control type="text" readOnly value={profile.job} />
                    </div>
                    <div className="mt-3">
                        <h5>프로젝트</h5>
                        <Form.Control as="textarea" rows={3} readOnly value={profile.projects} />
                    </div>
                    <div className="mt-3">
                        <h5>자격증</h5>
                        <Form.Control as="textarea" rows={3} readOnly value={profile.licenses} />
                    </div>
                    <div className="mt-3">
                        <h5>짧은 자기소개</h5>
                        <Form.Control as="textarea" rows={3} readOnly value={profile.shortAppeal} />
                    </div>
                    <div className="mt-3">
                        <h5>포트폴리오</h5>
                        <Form.Control type="text" readOnly value={profile.portfolio} />
                    </div>
                </section>
                <div className="d-flex my-3">
                    <Button variant="outline-dark " onClick={updateProfile}>
                        수정
                    </Button>
                    <Link className="btn btn-outline-dark ms-2" to="/list">
                        목록
                    </Link>
                    <Button variant="outline-danger" className=" ms-2" onClick={deleteProfile}>
                        삭제
                    </Button>
                    <Link className="btn btn-outline-dark ms-2" to="/write">
                        작성
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Detail;
