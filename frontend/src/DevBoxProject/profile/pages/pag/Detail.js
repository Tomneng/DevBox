import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import * as auth from "../../../apis/auth";
import * as Swal from "../../../apis/alert";
import {Radar} from "react-chartjs-2";
import Header from "../../../components/Header";



const Detail = () => {
    const navigate = useNavigate();
    let {id} = useParams();
    const [averageSkillsChartData, setAverageSkillsChartData] = useState({});
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
            let response2 = await auth.skillAvg();// 호출해서 레이더 차트에 표시할 평균 기술 데이터를 가져옴
            let datas = response2.data;
            console.log(datas)
            for (let i = 0; i < datas.length; i++){
                setAverageSkillsChartData((reaverageSkillsChartData) =>({
                    ...reaverageSkillsChartData,
                    [datas[i].name] : datas[i].average
                }))
            }
            response = await auth.profileDetail(id);
            console.log(response)
            console.log(response.data)
            data = response.data
            for (let i = 0; i < response.data.length; i++){
                response.data[i].technicalSkills.split("TTTTT")
            }
            setProfile(data)
        } catch (error) {
            console.error('Error fetching data:', error);
            return;
        }
    };
    useEffect(() => {
        DetailProfile()
    }, []);

    function removeOddIndexes(arr) {
        let skills = arr.split("TTTTT");
        console.log(skills)
        let realArr = [];
        for (let i = 1; i < skills.length; i++) {
            if (i % 2 !== 0) {
                realArr.push(skills[i])
            }
        }
        console.log(realArr.reverse())
        return realArr.reverse()
    }

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

    console.log(profile)
    console.log(profile.id); // 로그인때문에 userId에서 id로 바꿈!!!!!!!!!!!!

    return (
        <>
            <Header/>
            <div className="resume-container">
                <h2 className="resume-header">프로필 상세 보기</h2>
                <hr/>
                <section>
                    <div className="resume-section">
                        <h2>인적 정보</h2>
                        <div className="resume-item">
                            <label>이름:</label>
                            <span>{profile.name}</span>
                        </div>
                        <div className="resume-item">
                            <label>전화번호:</label>
                            <span>{profile.number}</span>
                        </div>
                        <div className="resume-item">
                            <label>나이:</label>
                            <span>{profile.age}</span>
                        </div>
                    </div>
                    <div className="resume-section">
                        <h2>학력</h2>
                        <div className="resume-item">
                            <label>학교:</label>
                            <span>{profile.degree}</span>
                        </div>
                        <div className="resume-item">
                            <label>전공:</label>
                            <span>{profile.csDegree}</span>
                        </div>
                    </div>
                    <div className="resume-section">
                        <h2>경력</h2>
                        <div className="resume-item">
                            <label>회사:</label>
                            <span>{profile.job}</span>
                        </div>
                        <div className="resume-item">
                            <label>직무:</label>
                            <span>{profile.jobType}</span>
                        </div>
                    </div>
                    <div className="resume-section">
                        <h2>About Me</h2>
                        <div className="resume-item">
                            <label>자기소개:</label>
                            <span>{profile.shortAppeal}</span>
                        </div>
                        <div className="resume-item">
                            <label>포트폴리오:</label>
                            <span>{profile.portfolio}</span>
                        </div>
                    </div>
                    <div className="mt-3">
                        <Radar
                            data={{
                                labels: profile.skills.split(','),
                                datasets: [
                                    {
                                        label: '기술 스택',
                                        backgroundColor: 'rgba(179,181,198,0.2)',
                                        borderColor: 'rgba(179,181,198,1)',
                                        pointBackgroundColor: 'rgba(179,181,198,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(179,181,198,1)',
                                        data: removeOddIndexes(profile.technicalSkills),
                                    },
                                    {
                                        label: '평균 기술 스택',
                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        pointBackgroundColor: 'rgba(255,99,132,1)',
                                        pointBorderColor: '#fff',
                                        pointHoverBackgroundColor: '#fff',
                                        pointHoverBorderColor: 'rgba(255,99,132,1)',
                                        data: profile.skills.split(',').map(skill => averageSkillsChartData[skill] || 0),
                                    },
                                ],
                            }}
                            options={{
                                scale: {
                                    ticks: {
                                        beginAtZero: true,
                                        min: 1,
                                        max: 5,
                                        stepSize: 1,
                                    },
                                },
                            }}
                        />
                    </div>
                </section>
            </div>
                <div className="d-flex my-3">
                    <Button variant="outline-dark" onClick={updateProfile}>
                        수정
                    </Button>
                    <Button variant="outline-danger" onClick={deleteProfile}>
                        삭제
                    </Button>
                    <Link className="btn btn-outline-dark ms-2" to="/profile/list">
                        목록
                    </Link>
                </div>
    </>
    );
};

export default Detail;
