import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

const UpdatePage = () => {
    // URL 파라미터에서 ID 추출
    let { id } = useParams();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        // 프로필 상태를 저장하는 상태 훅
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
    const submitProfile = (e) => {
        e.preventDefault();

        // 프로필 데이터를 업데이트하는 PUT 요청
        fetch(`http://localhost:8080/profile/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(profile),
        })
            .then((response) => {
                console.log(`response`, response);
                if (response.status === 200) {
                    return response.json();
                } else {
                    return null;
                }
            })
            .then((data) => {
                if (data !== null) {
                    alert(`수정 완료`);
                    console.log(`수정 완료`, data);
                    navigate(`/detail/ ${data.id}`); // 이동
                } else {
                    alert('실패!!!');
                }
            });
    };

    const [profilePicPreview, setProfilePicPreview] = useState(null);

    const toggleExperience = (e) => {
        const value = e.target.value;
        setProfile((prevProfile) => ({
            ...prevProfile,
            experience: value,
        }));
    };

    const toggleTechnicalSkills = (e) => {
        const value = e.target.value;
        setProfile((prevProfile) => ({
            ...prevProfile,
            technicalSkills: value,
        }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];

        setProfile((prevProfile) => ({
            ...prevProfile,
            profilePic: file,
        }));

        // 미리보기 이미지 업데이트
        if (file) {
            setProfilePicPreview(URL.createObjectURL(file));
        } else {
            setProfilePicPreview(null);
        }
    };

    return (
        <Container className="mt-3">
            <div className="row">
                <h2 className="display06">이력서 작성</h2>
                <hr />
                <div className="col-md-6">
                    <Form onSubmit={submitProfile}>
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
                                    src={profilePicPreview}
                                    style={{ maxWidth: '100%', height: '100px', display: 'block', marginTop: '10px' }}
                                    alt="프로필 미리보기"
                                />
                            )}
                        </div>

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

                        <Form.Group className="mt-3" controlId="formBasicNumber">
                            <Form.Label>
                                <h5>전화번호<small>(필수)</small></h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
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

                        <Form.Group className="mt-3" controlId="formBasicAge">
                            <Form.Label>
                                <h5>나이<small>(필수)</small></h5>
                            </Form.Label>
                            <Form.Control
                                type="text"
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
                            <div>
                                {['c++', 'Kotlin', 'Python', 'Java', 'C', 'C#', 'HTML/CSS'].map((skill, index) => (
                                    <div key={index} className="form-check">
                                        <Form.Check
                                            type="checkbox"
                                            label={skill}
                                            id={`skills-${index}`}
                                            name="skills"
                                            value={skill}
                                            checked={profile.skills.includes(skill)}
                                            onChange={changeValue}
                                        />
                                    </div>
                                ))}
                            </div>
                            {profile.skills === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>


                        {/* 기술능력 선택 */}
                        <Form.Group className="mt-3" controlId="formBasicTechnicalSkills">
                            <Form.Label>
                                <h5>기술능력 <small>(하나만 선택)</small></h5>
                            </Form.Label>
                            <div className="form-check">
                                <Form.Check
                                    type="radio"
                                    label="상"
                                    id="technicalSkills1"
                                    name="technicalSkills"
                                    value="상"
                                    checked={profile.technicalSkills === '상'}
                                    onChange={toggleExperience}
                                />
                            </div>
                            <div className="form-check">
                                <Form.Check
                                    type="radio"
                                    label="중"
                                    id="technicalSkills2"
                                    name="technicalSkills"
                                    value="중"
                                    checked={profile.technicalSkills === '중'}
                                    onChange={toggleExperience}
                                />
                            </div>
                            <div className="form-check">
                                <Form.Check
                                    type="radio"
                                    label="하"
                                    id="technicalSkills3"
                                    name="technicalSkills"
                                    value="하"
                                    checked={profile.technicalSkills === '하'}
                                    onChange={toggleTechnicalSkills}
                                />
                            </div>
                            {profile.technicalSkills.length === 0 && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group className="mt-3" controlId="formBasicExperience">
                            <Form.Label>
                                <h5>경력 <small>(하나만 선택)</small></h5>
                            </Form.Label>
                            <div className="form-check">
                                <Form.Check
                                    type="radio"
                                    label="1년이하"
                                    id="experience1"
                                    name="experience"
                                    value="1년이하"
                                    checked={profile.experience === '1년이하'}
                                    onChange={toggleExperience}
                                />
                            </div>
                            <div className="form-check">
                                <Form.Check
                                    type="radio"
                                    label="3년이상"
                                    id="experience2"
                                    name="experience"
                                    value="3년이상"
                                    checked={profile.experience === '3년이상'}
                                    onChange={toggleExperience}
                                />
                            </div>
                            <div className="form-check">
                                <Form.Check
                                    type="radio"
                                    label="5년이상"
                                    id="experience3"
                                    name="experience"
                                    value="5년이상"
                                    checked={profile.experience === '5년이상'}
                                    onChange={toggleExperience}
                                />
                            </div>
                            {profile.experience.length === 0 && (
                                <div>
                                </div>
                            )}
                        </Form.Group>

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

                        <div className="mb-3"></div> {/*포트폴리오와 작성완료버튼사이의 margin을 주기위함. */}

                        <Button variant="outline-dark" type="submit">
                            작성완료
                        </Button>
                        <Link className="btn btn-outline-dark ms-2" to="/list">
                            목록
                        </Link>
                    </Form>
                </div>
                <div className="col-md-6">
                    {/* 오른쪽에 렌더링되는 내용 */}
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
                        <p>기술능력: {profile.technicalSkills}</p>
                        <p>경력: {profile.experience}</p>
                        <p>직업: {profile.job}</p>
                        <p>프로젝트: {profile.projects}</p>
                        <p>자격증: {profile.licenses}</p>
                        <p>짧은 자기소개: {profile.shortAppeal}</p>
                        <p>포트폴리오: {profile.portfolio}</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default UpdatePage;
