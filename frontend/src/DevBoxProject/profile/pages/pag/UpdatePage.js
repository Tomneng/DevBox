import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import {profileUpdate} from "../../../apis/auth";
import * as auth from "../../../apis/auth";
import {Radar} from "react-chartjs-2";
import Swal from "sweetalert2";

const UpdatePage = () => {
    // URL 파라미터에서 ID 추출
    let { id } = useParams();
    const navigate = useNavigate();
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [selectedFont, setSelectedFont] = useState('Arial'); // 기본 폰트는 Arial로 설정
    const [profileBackgroundColor, setProfileBackgroundColor] = useState('#ffffff'); // 기본 배경색은 흰색
    const availableColors = ['#ffffff', '#e0f7fa', '#f8bbd0', '#b2ebf2', '#ffcdd2', '#c8e6c9', '#f0f4c3', '#d1c4e9', '#ffcc80', '#bcaaa4'];

    const [profile, setProfile] = useState({
        // 프로필 상태를 저장하는 상태 훅
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
        profilePic: null,
        createdAt: '',
        // 이모든건 key와 value의 값이다. = 즉 자바에서는 map 이다!
    });
    const [profilePicPreview, setProfilePicPreview] = useState(null);

    // 컴포넌트가 로드될 때 실행되는 효과 훅
    useEffect(() => {
        // ID를 이용해 프로필 데이터를 가져오는 GET 요청
        fetch(`http://localhost:8080/profile/detail/` + id)
            .then((response) => response.json())
            .then((data) => setProfile(data));
    }, []);

    // 입력값이 변경될 때 실행되는 함수
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

    // 수정 완료 버튼을 클릭할 때 실행되는 함수
    const submitProfile = async (e) => {
        e.preventDefault(); // 기본 submit 동작차단

        let response; // 응답 변수 선언
        let status; // 상태 코드 변수 선언

        try {
             response = await auth.profileUpdate(profile); // 프로필 수정을 위한 API 호출
        } catch (error) {
            console.error(`${error}`);
            console.error(`에러발생`);
            return;
        }
        status = response.status;
            if (status === 200) {
                console.log(`프로필 수정 성공`);
                // 성공 시 알림을 표시합니다.
                Swal.alert(" 성공", " 프로필이 수정되었습니다.", "success");
            } else {
                console.log(`프로필 수정 실패`);
                // 실패 시 알림을 표시합니다.
                Swal.alert(" 실패", " 프로필 수정에 실패하였습니다.", "error");
            }

    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // 파일 처리 로직 추가
        setProfile((prevProfile) => ({
            ...prevProfile,
            licenses: file ? file.name : '', // 파일 이름 저장
        }));
        console.log('업로드된 파일:', file);
    };
    const handleFontChange = (e) => {
        setSelectedFont(e.target.value); // 선택된 폰트 업데이트
    };

    // 선택한 폰트를 적용하기 위한 스타일
    const fontStyles = {
        fontFamily: selectedFont, // 선택된 폰트 적용
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0]; // 업로드된 파일 가져오기

        // 프로필 상태 업데이트
        setProfile((prevProfile) => ({
            ...prevProfile,
            profilePic: file, // 프로필 사진 업데이트
        }));

        // 파일이 존재할 경우 프로필 사진 미리보기 업데이트
        if (file) {
            setProfilePicPreview(URL.createObjectURL(file));
        } else {
            setProfilePicPreview(null);
        }
    };
    // 경험 토글 핸들러
    const toggleExperience = (e) => {
        const value = e.target.value;
        // 이전 프로필 상태를 가져와서 경험(experience) 값을 새로운 값으로 업데이트합니다.
        setProfile((prevProfile) => ({
            ...prevProfile,
            experience: value,
        }));
    };

// 기술 스킬 변경 핸들러
    const toggleTechnicalSkills = (skill, level) => {
        // 이전 프로필 상태를 가져와서 기술 스킬(technicalSkills) 값을 업데이트합니다.
        setProfile((prevProfile) => ({
            ...prevProfile,
            technicalSkills: {
                ...prevProfile.technicalSkills,
                // 선택된 기술(skill)의 레벨을 새로운 값(level)으로 업데이트합니다.
                [skill]: level,
            },
        }));
    };
    return (
        <div className="container mt-3">
            <div className="row">
                {/* 이력서 테마 선택과 폰트 선택이 한 줄에 보이도록 수정 */}
                <div className="col-md-4 write-page-left">
                    <div className="d-flex justify-content-between">
                        <div>
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
                        <div>
                            <h4>폰트 선택</h4>
                            <Form.Select
                                onChange={handleFontChange}
                                value={selectedFont}
                            >
                                <option value="Arial">Arial</option>
                                <option value="Times New Roman">Times New Roman</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Roboto">Roboto</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Avenir Light">Avenir Light</option>
                                <option value="PT Sans Bold">PT Sans Bold</option>
                                {/* 원하는 폰트들을 추가할 수 있습니다 */}
                            </Form.Select>
                        </div>
                    </div>
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
                        {/* 직무별 유무 선택 */}
                        <Form.Group className="mt-3" controlId="formBasicJobType">
                            <Form.Label>
                                <h5>직무별</h5>
                            </Form.Label>
                            <Form.Select
                                className="form-select"
                                name="jobType"
                                id="jobType"
                                value={profile.jobType}
                                onChange={changeValue}
                            >
                                <option value="" disabled>-- 직무를 선택해 주세요 --</option>
                                <option value="백엔드 개발자">백엔드 개발자</option>
                                <option value="프론트엔드 개발자">프론트엔드 개발자</option>
                                <option value="웹 개발자">웹 개발자</option>
                            </Form.Select>
                            {profile.jobType === '' && (
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

                        {/* 자격증 */}
                        <div className="container mt-3 mb-3 border rounded">
                            <div className="mb-3 mt-3">
                                <label>자격증:</label>
                                <div id="files">
                                    <input type="file" className="form-control col-xs-3" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                        {/* 자격증 */}

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
                        <Link className="btn btn-outline-dark ms-2" to="/profile/list">
                            목록
                        </Link>
                    </Form>
                </div>

            </div>
        </div>
    );
};
export default UpdatePage;
