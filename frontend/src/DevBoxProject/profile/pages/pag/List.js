// List.js

// 필요한 React 컴포넌트 및 라이브러리를 가져옵니다.
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Chart from 'chart.js/auto';
import Sidebar from './Sidebar';
import axios from "axios";
import * as auth from "../../../apis/auth";
import Header from "../../../components/Header";
import {Radar} from "react-chartjs-2";
import "../CSS/List.css"

// 함수형 컴포넌트 정의
const List = () => {
    // 프로필 데이터를 저장하는 상태
    const [profiles, setProfiles] = useState([]); // 프로필 목록을 상태로 관리합니다.
    const [averageSkillsChartData, setAverageSkillsChartData] = useState({});
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

    const profile = async () => {
        let response; // 응답 변수 선언
        let datas;
        try {
            response = await auth.profileList();
            let responseFromAvg = await auth.skillAvg();
            datas = responseFromAvg.data
            setProfiles(response.data);
            console.log(response.data)
            console.log(response.data[0].technicalSkills.split("TTTTT"))
            for (let i = 0; i < response.data.length; i++){
                response.data[i].technicalSkills.split("TTTTT")
            }
            console.log(datas)
            for (let i = 0; i < datas.length; i++){
                setAverageSkillsChartData((reaverageSkillsChartData) =>({
                    ...reaverageSkillsChartData,
                    [datas[i].name] : datas[i].average
                }))
            }
        } catch (error) {
            console.error('Error fetching data:', error); // 오류 메시지 출력
        }
    };


    // ★★★★★★★★★★★여기가 프로필불러오는곳★★★★★★★★★★★★
    // 컴포넌트가 마운트될 때 서버에서 프로필 데이터를 가져오는 효과 훅
    useEffect(() => {
        // 프로필 데이터를 가져와서 상태로 업데이트합니다.
                profile(); // 프로필 데이터를 가져오는 함수 호출
    }, []);

    // JSX를 반환
    return (
        <>
            <Header/>

                        <h2 className="display06">이력서 목록</h2>
                        <hr />
                <div className="bigPage">

                        {/* 각 프로필에 대한 SwiperSlide를 생성 */}
                        {profiles.map((profile) => (
                            <div key={profile.id}>
                                <Card id={`profileCard_${profile.id}`}>
                                    <Card.Body>
                                        <Card.Title>{profile.name}</Card.Title>
                                        <Card.Text>나이: {profile.age}</Card.Text>
                                        <Card.Text>기술 스택: {profile.skills}</Card.Text>
                                        {/* 레이더 차트 */}
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
                                                            min: 1, // 최소값 설정
                                                            max: 5, // 최대값 설정
                                                            stepSize: 1, // 간격 설정
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                        {/* 프로필 상세보기 링크 */}
                                        <Link to={`/profile/detail/${profile.id}`}>
                                            <Button variant="info" size="sm">
                                                상세보기
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}

                </div>
                        {/* 작성 링크 */}
                        <div className="d-flex my-3">
                            <Link className="btn btn-outline-dark" to="/profile/write">
                                작성
                            </Link>
                        </div>
        </>

    );
};

export default List;
