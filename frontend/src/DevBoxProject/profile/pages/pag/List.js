// 필요한 React 컴포넌트 및 라이브러리를 가져옵니다.
import React, {useContext, useEffect, useState} from 'react'; // 리액트 및 훅을 가져옵니다.
import { Link } from 'react-router-dom'; // 리액트 라우터의 링크 컴포넌트를 가져옵니다.
import { Button, Container, Card } from 'react-bootstrap'; // 부트스트랩 컴포넌트를 가져옵니다.
import { Swiper, SwiperSlide } from 'swiper/react'; // Swiper 슬라이드 관련 컴포넌트를 가져옵니다.
import 'swiper/swiper-bundle.css'; // Swiper의 스타일을 가져옵니다.
import Chart from 'chart.js/auto'; // 차트 관련 라이브러리를 가져옵니다.
import './styles.css'; // 컴포넌트에 적용할 스타일 시트를 가져옵니다.
import Sidebar from './Sidebar'; // 사이드바 컴포넌트를 가져옵니다.
import axios from "axios"; // axios 라이브러리를 가져옵니다.
import {profileList} from "../../../apis/auth"; // 프로필 목록 API 함수를 가져옵니다.
import * as auth from "../../../apis/auth"; // 인증 관련 API 함수들을 가져옵니다.
import {LoginContext} from "../../../contexts/LoginContextProvider"; // 로그인 컨텍스트를 가져옵니다.

// 함수형 컴포넌트 정의
const List = () => {
    // 프로필 데이터를 저장하는 상태
    const [profiles, setProfiles] = useState([]); // 프로필 목록을 상태로 관리합니다.


    // ★★★★★★★★★★★여기가 프로필불러오는곳★★★★★★★★★★★★
    // 컴포넌트가 마운트될 때 서버에서 프로필 데이터를 가져오는 효과 훅
    useEffect(() => {
        // 프로필 데이터를 가져와서 상태로 업데이트합니다.
        const profile = async () => {
            let response; // 응답 변수 선언
            let status; // 상태 코드 변수 선언
            try {
                response = await auth.profileList(profile); // 프로필 목록을 가져오는 API 호출
                setProfiles(response.data); // 가져온 데이터로 프로필 목록 상태 업데이트
            } catch (error) {
                console.error('Error fetching data:', error); // 오류 메시지 출력
            }
        };

        profile(); // 프로필 데이터를 가져오는 함수 호출
    }, []);

    // 프로필 데이터가 변경될 때 레이더 차트를 업데이트하는 효과 훅
    useEffect(() => {
        // 프로필 데이터가 있고 비어있지 않은지 확인
        if (profiles && profiles.length > 0) {
            profiles.forEach((profile) => {
                console.log(`프로필 처리 중: ${profile.name}`);
                console.log(`선택된 기술: ${profile.skills}`);

                // 각 프로필에 대한 고유한 캔버스 ID 생성
                const canvasId = `radarChart_${profile.id}`;
                const existingCanvas = document.getElementById(canvasId);

                if (existingCanvas) {
                    // 이미 존재하는 캔버스 및 차트 삭제
                    existingCanvas.remove();
                }

                // 새로운 캔버스 요소 생성
                const canvas = document.createElement('canvas');
                canvas.id = canvasId;
                canvas.width = 400;
                canvas.height = 200;

                // 캔버스 컨텍스트 가져오기 및 레이더 차트 생성
                const ctx = canvas.getContext('2d');
                const radarChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: ['c++', 'Kotlin', 'Python', 'Java', 'C', 'C#', 'HTML/CSS'],
                        datasets: [{
                            label: 'My Dataset',
                            data: [0, 0, 0, 0, 0, 0, 0],
                            fill: true,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgb(255, 99, 132)',
                            pointBackgroundColor: 'rgb(255, 99, 132)',
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgb(255, 99, 132)',
                        }],
                    },
                    options: {
                        elements: {
                            line: {
                                borderWidth: 3,
                            },
                        },
                    },
                });

                // 프로필의 선택된 기술 스택과 기술 능력을 가져와서 Radar Chart에 반영합니다.
                const selectedSkills = profile.skills ? profile.skills.split(', ') : [];
                selectedSkills.forEach((skill) => {
                    const skillIndex = getSkillIndex(skill);
                    const skillWeight = getSkillWeight(profile.technicalSkills, skill);

                    radarChart.data.datasets[0].data[skillIndex] = skillWeight;
                });

                // 데이터 업데이트 및 차트 다시 그리기
                radarChart.update();
                radarChart.render();

                // 프로필 카드에 캔버스 추가
                const profileCard = document.getElementById(`profileCard_${profile.id}`);
                profileCard.appendChild(canvas);
            });
        }
    }, [profiles]);

    // 기술 능력에 따른 가중치를 반환하는 함수
    const getSkillWeight = (technicalSkills, skill) => {
        console.log('technicalSkills:', technicalSkills); // 로그 추가
        console.log('skill:', skill); // 로그 추가

        const lowerCaseSkill = skill.toLowerCase();
        if (technicalSkills.includes(`${lowerCaseSkill}-상`)) {
            return 1.0;
        } else if (technicalSkills.includes(`${lowerCaseSkill}-중`)) {
            return 0.5;
        } else if (technicalSkills.includes(`${lowerCaseSkill}-하`)) {
            return 0.0;
        } else {
            return 0.0;
        }
    };

    // 기술에 따른 인덱스를 반환하는 함수
    const getSkillIndex = (skill) => {
        switch (skill) {
            case 'c++':
                return 0;
            case 'kotlin':
                return 1;
            case 'python':
                return 2;
            case 'java':
                return 3;
            case 'c':
                return 4;
            case 'c#':
                return 5;
            case 'html/css':
                return 6;
            default:
                return -1;
        }
    };

    // JSX를 반환
    return (
        <Container className="mt-3">
            <div className="row">
                <Sidebar />

                <div className="col-md-9">
                    <h2 className="display06">이력서 목록</h2>
                    <hr />

                    {/* 각 프로필에 대한 SwiperSlide를 생성 */}
                    {profiles.map((profile) => (
                        <SwiperSlide key={profile.id}>
                            <Card id={`profileCard_${profile.id}`} style={{ width: '18rem', margin: '10px' }}>
                                <Card.Body>
                                    <Card.Title>{profile.name}</Card.Title>
                                    <Card.Text>나이: {profile.age}</Card.Text>
                                    <Card.Text>기술 스택: {profile.skills}</Card.Text>
                                    {/* 레이더 차트 */}
                                    <canvas id={`radarChart_${profile.id}`} width="400" height="200"></canvas>
                                    {/* 프로필 상세보기 링크 */}
                                    <Link to={`/detail/${profile.id}`}>
                                        <Button variant="info" size="sm">
                                            상세보기
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>

                    ))}


                    {/* 작성 링크 */}
                    <div className="d-flex my-3">
                        <Link className="btn btn-outline-dark" to="/profile/write">
                            작성
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default List;
