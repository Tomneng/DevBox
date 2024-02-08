import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Radar } from 'react-chartjs-2';
import './WritePage.css';

const WritePage = () => {
    const navigate = useNavigate();
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [profileBackgroundColor, setProfileBackgroundColor] = useState('#ffffff'); // 기본 배경색은 흰색
    const availableColors = ['#ffffff', '#e0f7fa', '#f8bbd0', '#b2ebf2', '#ffcdd2', '#c8e6c9', '#f0f4c3', '#d1c4e9', '#ffcc80', '#bcaaa4'];

    const [profile, setProfile] = useState({
        id: '',
        name: '',
        number: '',
        age: '',
        degree: '',
        csDegree: '',
        skills: '',
        technicalSkills: {}, // 기술 능력을 객체로 변경
        job: '',
        experience: '',
        projects: '',
        licenses: '',
        shortAppeal: '',
        portfolio: '',
        profilePic: null,
        createdAt: '',
    });

    const [profilePicPreview, setProfilePicPreview] = useState(null);

    const [radarChartData, setRadarChartData] = useState({
        labels: [],
        datasets: [
            {
                label: '기술 스택',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [], // 동적으로 계산되도록 수정
            },
        ],
    });

    useEffect(() => {
        // 레이더 차트 데이터 갱신
        setRadarChartData((prevData) => ({
            ...prevData,
            labels: profile.skills.split(','),
            datasets: [
                {
                    ...prevData.datasets[0],
                    data: Array(profile.skills.split(',').length).fill(1),
                },
            ],
        }));
    }, [profile.skills]);

    const toggleExperience = (e) => {
        const value = e.target.value;
        setProfile((prevProfile) => ({
            ...prevProfile,
            experience: value,
        }));
    };

    // 기술 능력 변경 핸들러
    const toggleTechnicalSkills = (skill, level) => {
        setProfile((prevProfile) => ({
            ...prevProfile,
            technicalSkills: {
                ...prevProfile.technicalSkills,
                [skill]: level,
            },
        }));
    };

    const changeValue = (e) => {
        const { name, value, type, checked } = e.target;

        setProfile((prevProfile) => {
            if (type === 'checkbox') {
                return {
                    ...prevProfile,
                    [name]: checked
                        ? prevProfile[name].length > 0
                            ? `${prevProfile[name]},${value}`
                            : value
                        : prevProfile[name]
                            .split(',')
                            .filter((item) => item !== value)
                            .join(','),
                };
            } else {
                return {
                    ...prevProfile,
                    [name]: value,
                };
            }
        });
    };

    const submitProfile = (e) => {
        e.preventDefault();

        const currentTime = new Date().toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Seoul',
        });

        fetch('http://localhost:8080/profile/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(profile),
        })
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                if (data !== null) {
                    alert('제출 완료');
                    navigate(`/detail/${data.id}`);
                } else {
                    alert('실패!!! 뚜두둥 뚜두둥');
                }
            });
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];

        setProfile((preProfile) => ({
            ...preProfile,
            profilePic: file,
        }));

        if (file) {
            setProfilePicPreview(URL.createObjectURL(file));
        } else {
            setProfilePicPreview(null);
        }
    };

    // 배경색 변경 함수
    const changeBackgroundColor = (color) => {
        setProfileBackgroundColor(color);
    };

    return (
        <div className="container mt-3">

            <div className="row">
                {/* 왼쪽 - 이력서 테마 선택 */}
                <div className="col-md-4 write-page-left">
                    <h4>이력서 테마 선택</h4>
                    <Form.Select
                        onChange={(e) => setProfileBackgroundColor(e.target.value)}
                        value={profileBackgroundColor}
                    >
                        {availableColors.map((color, index) => (
                            <option key={index} value={color}>
                                배경색 {index + 1}
                            </option>
                        ))}
                    </Form.Select>
                </div>


                {/* 중간 - 이력서 작성 폼 */}
                <div className="col-md-4 write-page-middle">
                    <h2 className="display06">이력서 작성</h2>
                    <hr />
                    <Form onSubmit={submitProfile}>
                        {/* 프로필 사진 입력 */}
                        <div className="mt-3">
                            <label htmlFor="profilePic"><h5>프로필 사진</h5></label>
                            <input
                                type="file"
                                className="form-control"
                                id="profilePic"
                                accept="image/*"
                                onChange={handleProfilePicChange}
                            />
                            {/* 미리보기 이미지 영역 */}
                            {profilePicPreview && (
                                <img
                                    src={URL.createObjectURL(profile.profilePic)}
                                    style={{ maxWidth: '100%', height: '100px', display: 'block', marginTop: '10px' }}
                                    alt="프로필 미리보기"
                                />
                            )}
                        </div>

                        {/* 이름 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicName">
                            <Form.Label>
                                <h5>이름<small>(필수)</small></h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="이름을 입력하세요"
                                onChange={changeValue}
                                name="name"
                                required
                            />
                            {profile.name === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

                        {/* 전화번호 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicNumber">
                            <Form.Label>
                                <h5>전화번호<small>(필수)</small></h5>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="전화번호를 입력하세요"
                                onChange={changeValue}
                                name="number"
                                required
                            />
                            {profile.number === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

                        {/* 나이 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicAge">
                            <Form.Label>
                                <h5>나이<small>(필수)</small></h5>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="나이을 입력하세요"
                                onChange={changeValue}
                                name="age"
                                required
                            />
                            {profile.age === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

                        {/* 학력 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicDegree">
                            <Form.Label>
                                <h5>학력</h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="예시) 00고등학교 졸업"
                                onChange={changeValue}
                                name="degree"
                            />
                        </Form.Group>

                        {/* 전공자 유무 선택 */}
                        <Form.Group className="mt-3" controlId="formBasicCsDegree">
                            <Form.Label>
                                <h5>전공자 유무</h5>
                            </Form.Label>
                            <Form.Select
                                className="form-select"
                                name="csDegree"
                                id="csDegree"
                                value={profile.csDegree}
                                onChange={changeValue}
                            >
                                <option value="" disabled>-- 전공자유무를 선택해 주세요 --</option>
                                <option value="비전공자">비전공자</option>
                                <option value="전공자">전공자</option>
                            </Form.Select>
                            {profile.csDegree === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

                        {/* 기술스택 선택 */}
                        <Form.Group className="mt-3" controlId="formBasicSkills">
                            <Form.Label>
                                <h5>기술스택<small>(다중선택 가능)</small></h5>
                            </Form.Label>

                            <div className="row">
                                {['c++', 'Kotlin', 'Python', 'Java', 'C#', 'HTML/CSS', 'MyBatis', 'Jpa', 'Aws',
                                    'MongoDB','Jsp','Spring','Bootstrap', 'Ajax', 'PHP', 'MySql', 'React', 'RDBMS', 'API'
                                ].map((skill, index) => (
                                    <div key={index} className="col-2">
                                        <div className="form-check">
                                            <Form.Check
                                                type="checkbox"
                                                label={skill}
                                                id={`skills-${index}`}
                                                name="skills"
                                                value={skill}
                                                checked={profile.skills.includes(skill)}
                                                onChange={changeValue}
                                            />
                                            {/* 기술 스택에 대한 기술 능력 선택 */}
                                            {profile.skills.includes(skill) && (
                                                <div>
                                                    <Form.Select
                                                        className="mt-2"
                                                        value={profile.technicalSkills[skill] || ''}
                                                        onChange={(e) => toggleTechnicalSkills(skill, e.target.value)}
                                                    >
                                                        <option value="">기술능력을 선택하세요</option>
                                                        {[1, 2, 3, 4, 5].map((level, index) => (
                                                            <option key={index} value={level}>{level}</option>
                                                        ))}
                                                    </Form.Select>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {profile.skills === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

                        {/* 경력 선택 */}
                        <Form.Group className="mt-3 d-flex" controlId="formBasicExperience">
                            <Form.Label className="flex-grow-1">
                                <h5>경력 <small>(하나만 선택)</small></h5>
                            </Form.Label>
                            <div className="d-flex align-items-center">
                                {['상', '중', '하'].map((level, index) => (
                                    <Form.Check
                                        key={index}
                                        type="radio"
                                        label={level}
                                        id={`experience-${index}`}
                                        name="experience"
                                        value={level}
                                        checked={profile.experience === level}
                                        onChange={toggleExperience}
                                        className="me-3"
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        {/* 직업 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicJob">
                            <Form.Label>
                                <h5>직업</h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="현재 직업을 입력해주세요"
                                onChange={changeValue}
                                name="job"
                            />
                        </Form.Group>

                        {/* 프로젝트 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicProjects">
                            <Form.Label>
                                <h5>프로젝트</h5>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="프로젝트 경험에 대한 설명을 입력하세요"
                                onChange={changeValue}
                                name="projects"
                            />
                        </Form.Group>

                        {/* 자격증 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicLicenses">
                            <Form.Label>
                                <h5>자격증</h5>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="보유한 자격증에 대한 설명을 입력하세요"
                                onChange={changeValue}
                                name="licenses"
                            />
                        </Form.Group>

                        {/* 짧은 자기소개 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicShortAppeal">
                            <Form.Label>
                                <h5>짧은 자기소개</h5>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="짧은 자기소개를 입력하세요"
                                onChange={changeValue}
                                name="shortAppeal"
                            />
                        </Form.Group>

                        {/* 포트폴리오 입력 */}
                        <Form.Group className="mt-3" controlId="formBasicPortfolio">
                            <Form.Label>
                                <h5>포트폴리오</h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="포트폴리오 링크를 입력하세요"
                                onChange={changeValue}
                                name="portfolio"
                            />
                        </Form.Group>

                        <div className="mb-3"></div>

                        {/* 작성완료 버튼 */}
                        <Button variant="outline-dark" type="submit">
                            작성완료
                        </Button>

                        {/* 목록으로 돌아가기 버튼 */}
                        <Link className="btn btn-outline-dark ms-2" to="/list">
                            목록
                        </Link>
                    </Form>
                </div>

                {/* 오른쪽 - 프로필 내용 및 레이더 차트 */}
                <div className="col-md-4 write-page-right" style={{ backgroundColor: profileBackgroundColor }}>
                    <div id="renderedContent">
                        <h2>프로필 내용</h2>
                        {profilePicPreview && (
                            <img
                                src={profilePicPreview}
                                style={{ maxWidth: '100%', height: '100px', marginTop: '10px' }}
                                alt="프로필 미리보기"
                            />
                        )}
                        <p>이름: {profile.name}</p>
                        <p>전화번호: {profile.number}</p>
                        <p>나이: {profile.age}</p>
                        <p>학력: {profile.degree}</p>
                        <p>전공자 유무: {profile.csDegree}</p>
                        <p>기술 스택: {profile.skills}</p>

                        {/* 기술 능력 출력 */}
                        <p>기술 능력:
                            {Object.keys(profile.technicalSkills).map((skill, index) => (
                                <span key={index}>
                                    {`${skill}: ${profile.technicalSkills[skill]} `}
                                </span>
                            ))}
                        </p>
                        <p>경력: {profile.experience}</p>
                        <p>직업: {profile.job}</p>
                        <p>프로젝트: {profile.projects}</p>
                        <p>자격증: {profile.licenses}</p>
                        <p>짧은 자기소개: {profile.shortAppeal}</p>
                        <p>포트폴리오: {profile.portfolio}</p>
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
                                        data: profile.skills.split(',').map(skill => profile.technicalSkills[skill] || 0),
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
                </div>
            </div>
        </div>
    );
};

export default WritePage;
