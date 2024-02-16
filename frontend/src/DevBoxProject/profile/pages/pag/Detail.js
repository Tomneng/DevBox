import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import * as auth from "../../../apis/auth";
import * as Swal from "../../../apis/alert";


const Detail = () => {
    const navigate = useNavigate();
    let {id} = useParams();
    const [profile, setProfile] = useState({
        id: '',
        name: '',
        number: '',
        age: '',
        degree: '',
        csDegree: '',
        jobType: '',   // 직무별
        skills: '',
        technicalSkills: '', // 기술 능력을 객체로 변경
        job: '',
        experience: '',
        projects: '',
        licenses: '', // 자격증 파일 이름 저장
        shortAppeal: '',
        portfolio: '',
        profilePic: '',
        createdAt: '',
    });

    const DetailProfile = async () => {
        let response; // 응답 변수 선언
        let data
        console.log('프로필 전송 시도 중...');

        try {
            response = await auth.profileDetail(id);
            console.log(response)
            console.log(response.data)
            data = response.data
            setProfile(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
    };
    useEffect(() => {
        DetailProfile()
    }, []);

    const deleteProfile = async (e) => {
        let response;
        let data;
        try {
            response = await auth.profileDelete(id);
        } catch (error) {
            console.error('에러', error);
            return;
        }

        data = response.data;
        if (data === 1) {
            console.log('삭제성공');
            navigate(`/profile/list`);
            Swal.alert(" 성공", " 다시  해주세요.", "success");
        } else {
            console.log(`정보수정 실패`);
            // 실패 시 알림을 표시합니다.
            Swal.alert(" 실패", " 실패 하였습니다.", "error");
        }
    };
    const updateProfile = () => {
        navigate(`/profile/update/${id}`);
    };

    let profilePicPreview;
    console.log(profile)
    console.log(profile.id);
    return (
        <Container className="mt-3">
            <div className="row">
                <h2 className="display06">프로필 상세 보기</h2>
                <hr/>
                <div className="col-md-6">
                    <Alert variant="light" className="d-flex justify-content-between">
                        <span>ID: {id}</span>
                    </Alert>
                </div>
                <section>
                    <div className="mt-3">
                        <h5>이름</h5>
                        <Form.Control type="text" readOnly value={profile.name}/>
                    </div>
                    <div className="mt-3">
                        <h5>전화번호</h5>
                        <Form.Control type="text" readOnly value={profile.number}/>
                    </div>
                    <div className="mt-3">
                        <h5>나이</h5>
                        <Form.Control type="text" readOnly value={profile.age}/>
                    </div>
                    <div className="mt-3">
                        <h5>학력</h5>
                        <Form.Control type="text" readOnly value={profile.degree}/>
                    </div>
                    <div className="mt-3">
                        <h5>전공자 유무</h5>
                        <Form.Control type="text" readOnly value={profile.csDegree}/>
                    </div>
                    <div className="mt-3">
                        <h5>기술스택</h5>
                        <Form.Control type="text" readOnly value={profile.skills}/>
                    </div>
                    <div className="mt-3">
                        <h5>기술능력</h5>
                        <Form.Control type="text" readOnly value={Object.keys(profile.technicalSkills).join(', ')}/>
                    </div>
                    <div className="mt-3">
                        <h5>경력</h5>
                        <Form.Control type="text" readOnly value={profile.experience}/>
                    </div>
                    <div className="mt-3">
                        <h5>직업</h5>
                        <Form.Control type="text" readOnly value={profile.job}/>
                    </div>
                    <div className="mt-3">
                        <h5>프로젝트</h5>
                        <Form.Control as="textarea" rows={3} readOnly value={profile.projects}/>
                    </div>
                    <div className="mt-3">
                        <h5>자격증</h5>
                        <Form.Control as="textarea" rows={3} readOnly value={profile.licenses}/>
                    </div>
                    <div className="mt-3">
                        <h5>짧은 자기소개</h5>
                        <Form.Control as="textarea" rows={3} readOnly value={profile.shortAppeal}/>
                    </div>
                    <div className="mt-3">
                        <h5>포트폴리오</h5>
                        <Form.Control type="text" readOnly value={profile.portfolio}/>
                    </div>
                </section>
                <div className="d-flex my-3">
                    <Button variant="outline-dark " onClick={updateProfile}>
                        수정
                    </Button>
                    <Button variant="outline-danger" className="ms-2" onClick={deleteProfile}>
                        삭제
                    </Button>
                    <Link className="btn btn-outline-dark ms-2" to="/profile/list">
                        목록
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Detail;
