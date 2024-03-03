import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import {Radar} from 'react-chartjs-2';
import './WritePage.css';
import * as Swal from "../../../apis/alert";
import * as auth from "../../../apis/auth";
import {LoginContext} from "../../../contexts/LoginContextProvider";
import Header from "../../../components/Header";

const WritePage = () => {
    const {userInfo} = useContext(LoginContext) // 현재 로그인된 사용자의 정보=userInfo
    const navigate = useNavigate();// 페이지이동을 위함
    const [profileBackgroundColor, setProfileBackgroundColor] = useState('#ffffff'); // 기본 배경색은 흰색
    const [technicalSkills, setTechnicalSkills] = useState({});

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
        userId: '',
        // 이모든건 key와 value의 값이다. = 즉 자바에서는 map 이다!
    });

    const [profilePicPreview, setProfilePicPreview] = useState(null);// useState을 사용해서 profilePicPreview상태변수 설정후, 초기값은 null
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
        console.log("Profile information:", profile); // 프로필정보가 잘찍히는지 / 400에러 처리를 위함
        console.log("Radar chart data:", radarChartData); // 레이더 차트 데이터 확인
        const skillsArray = profile.skills.split(',');
        // skills 배열을 가져오기 위해 쉼표로 구분된 skills 목록을 배열로 변환
        console.log("Skills array:", skillsArray); // 기술 배열 확인 / 400에러 처리를 위함

        // 이 효과는 profile.skills이 변경될 때마다 실행됩니다.
        // profile.skills에서 기존 데이터를 가져와서 새 데이터로 업데이트합니다.

        setRadarChartData((prevData) => ({
            ...prevData,
            // 기존 라벨을 새로운 기술 목록으로 업데이트합니다.
            labels: skillsArray,// 쉼표로 구분해서 문자열에서 배열로 만듬
            datasets: [
                {
                    ...prevData.datasets[0],// 이전데이터 동일유지하면서 덮어씌움
                    data: Array(skillsArray.length).fill(1),
                    // 새 데이터 세트를 업데이트합니다. 모든 기술 레벨은 1로 초기화됩니다.
                },
            ],
        }));

        let skillString = profile.skills.split(',').map((skill) => '' + skill + "TTTTT" + technicalSkills[skill])
        // profile의 기술과 기술레벨을 문자열로 조합 후 기술스킬데이터를 업데이트 해줌
        setProfile((prevProfile) => ({
            ...prevProfile,
            technicalSkills: skillString.join("TTTTT")//기술문자열에 ttttt조인해줌
        }))
    }, [profile.skills, profile.technicalSkills, technicalSkills]);// [profile.skills]이 변경될때마다 실행함
    console.log("Radar component:", Radar); // Radar 컴포넌트 위치 확인


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
        setTechnicalSkills((prevState) => ({// 호출후  기존skill을 키로 갖고 해당 level값을 설정해줌
            ...prevState,
            // 기존의 기술 스킬을 문자열로 변환하여 업데이트합니다.
            [skill]: level
        }));
        console.log(String(level));
        console.log(technicalSkills)

    };

// 값 변경 핸들러
    const changeValue = (e) => {
        const {name, value, type, checked} = e.target;

        setProfile((prevProfile) => ({
            ...prevProfile,
            userId: userInfo.id
        }));

        // 이전 프로필 상태를 가져와서 업데이트
        setProfile((prevProfile) => {
            if (type === 'checkbox') {
                // 체크박스의 경우 여러 값을 처리합니다.
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
                // 체크박스가 아닌 경우 단일 값으로 업데이트
                return {
                    ...prevProfile,
                    [name]: value,
                };
            }
        });
        console.log(profile)
    };

    const submitProfile = async (e) => {
        e.preventDefault(); // 폼 제출 동작 막음
        let response; // 응답 변수 선언
        let status; // 상태 코드 변수 선언

        console.log('프로필 전송 시도 중...');
        // 프로필 정보를 서버에 저장하는 비동기 함수
        console.log(profile)
        try {

            // auth.profileWrite 함수를 호출하고 응답을 기다립니다.
            response = await auth.profileWrite(profile); // axios 내부적으로 사용될 수 있음
            console.log("response = " + response);
        } catch (error) {
            // 오류가 발생하면 콘솔에 오류 메시지를 출력하고 함수를 종료합니다.
            console.error('프로필 전송 중 오류 발생:', error);
            console.error('에러발생', error.message); // 오류 메시지 출력
            return;
        }
        // 응답에서 상태 코드를 가져옵니다.
        status = response.status;
        console.log('응답 상태 코드:', status);
        // 상태 코드에 따라 적절한 동작을 수행합니다.
        if (status === 201) {
            console.log(`정보수정 성공`);
            let data = response.data

            // 프로필 제출이 성공했을 때 페이지 이동
            navigate(`/profile/detail/${data.id}`); // 상세 페이지로 이동
            // 성공 시 알림을 표시합니다.
            Swal.alert(" 성공", " 다시  해주세요.", "success");
        } else {
            console.log(`정보수정 실패`);
            // 실패 시 알림을 표시합니다.
            Swal.alert(" 실패", " 실패 하였습니다.", "error");
        }
    };
    // 프로필 사진 변경 핸들러
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

    // 새로운 레이더 차트 데이터 받아오는 함수
    const fetchAverageSkillsData = async () => {
        try {

            let response = await auth.skillAvg();// 호출해서 레이더 차트에 표시할 평균 기술 데이터를 가져옴
            let datas = response.data;
            console.log(datas)
            for (let i = 0; i < datas.length; i++){
                setAverageSkillsChartData((reaverageSkillsChartData) =>({
                    ...reaverageSkillsChartData,
                    [datas[i].name] : datas[i].average
                }))
            }
        } catch (error) {
            console.error('평균 기술 데이터 가져오다가 오류 발생했습니다. :', error)
        }

    };
    useEffect(() => {
        // useEffect를 사용하여 컴포넌트가 로드될 때 새로운 레이더 차트 데이터를 가져옵니다.
        fetchAverageSkillsData();
    }, []);
    // dependency : 의존성 , effect : 영향 / useEffect는 즉 영향을 받아서 이안의 작업을 처리한다.
    // useEffect : 의존성이 []로 부여되지 않아서 즉 한번만 실행이 된다. 즉 [] 이안에는 통상적으로 상태값들이 들어와야한다. 변하는 값들!!!!

    // 새로운 레이더 차트 데이터를 저장할 상태 변수
    const [averageSkillsChartData, setAverageSkillsChartData] = useState({
    });
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // 파일 처리 로직 추가
        setProfile((prevProfile) => ({
            ...prevProfile,
            licenses: file ? file.name : '', // 파일 이름 저장
        }));
        console.log('업로드된 파일:', file);
    };
    const formFields = [
        { label: '이름', type: 'text', placeholder: '이름을 입력하세요', name: 'name', required: true },
        { label: '전화번호', type: 'number', placeholder: '전화번호를 입력하세요', name: 'number', required: true },
        { label: '나이', type: 'number', placeholder: '나이를 입력하세요', name: 'age', required: true },
        { label: '학력', type: 'text', placeholder: '예시) 00고등학교 졸업', name: 'degree' },
        { label: '전공자 유무', type: 'select', options: ['', '비전공자', '전공자'], name: 'csDegree' },
        { label: '직무별 유무', type: 'select', options: ['', '백엔드 개발자', '프론트엔드 개발자', '웹 개발자'], name: 'jobType' },
        { label: '회사', type: 'text', placeholder: '현재 근무중인 회사명을 입력해주세요', name: 'job' },
        { label: '짧은 자기소개', type: 'textarea', placeholder: '짧은 자기소개를 입력하세요', name: 'shortAppeal', rows: 3 },
        { label: '포트폴리오', type: 'text', placeholder: '포트폴리오 링크를 입력하세요', name: 'portfolio' },
    ];

    const renderFields = () => {
        return formFields.map((field, index) => (
            <Form.Group controlId={`formBasic${field.name}`} key={index}>
                <Form.Label>
                    <h5>{field.label}{field.required && <small>(필수)</small>}</h5>
                </Form.Label>
                {field.type === 'select' ? (
                    <Form.Select
                        className="form-select"
                        name={field.name}
                        id={field.name}
                        value={profile[field.name]}
                        onChange={changeValue}
                    >
                        {field.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>{option}</option>
                        ))}
                    </Form.Select>
                ) : (
                    field.type === 'textarea' ? (
                        <Form.Control
                            as="textarea"
                            rows={field.rows}
                            placeholder={field.placeholder}
                            onChange={changeValue}
                            name={field.name}
                            value={profile[field.name]}
                        />
                    ) : (
                        <Form.Control
                            type={field.type}
                            placeholder={field.placeholder}
                            onChange={changeValue}
                            name={field.name}
                            value={profile[field.name]}
                            required={field.required}
                        />
                    )
                )}
                {profile[field.name] === '' && <div></div>}
            </Form.Group>
        ));
    };
    return (
        <>
            <Header/>
        <div className="profile-container">
            <div className="profile-container-left">
                {/* 이력서 테마 선택과 폰트 선택이 한 줄에 보이도록 수정 */}
                {/* 중간 - 이력서 작성 폼 */}
                    <h2>이력서 작성</h2>
                    <Form onSubmit={submitProfile}>
                        {renderFields()}
                        {/* 기술스택 선택 */}
                        <Form.Group className="mt-3" controlId="formBasicSkills">
                            <Form.Label>
                                <h5>기술스택<small>(다중선택 가능)</small></h5>
                            </Form.Label>
                            <div className="skillsCheckBoxes">
                                {['c++', 'Kotlin', 'Python', 'Java', 'C#', 'HTML/CSS', 'MyBatis', 'Jpa', 'Aws EC2', 'Aws RDS',
                                    'MongoDB', 'Jsp', 'Spring', 'Bootstrap', 'Ajax', 'PHP', 'MySql', 'React', 'RDBMS', 'API'
                                ].map((skill, index) => (
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="mbties"
                                                id={`skills-${index}`}
                                                name="skills"
                                                value={skill}
                                                checked={profile.skills.includes(skill)}
                                                onChange={changeValue}
                                            />
                                            <label htmlFor={`skills-${index}`} className="mbties-label">
                                                {skill}
                                            </label>
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
                                ))}
                            </div>
                            {profile.skills === '' && (
                                <div>
                                </div>
                            )}
                        </Form.Group>
                        {/* 자격증 */}
                        <div className="mt-3 mb-3 border rounded">
                            <div className="mb-3 mt-3">
                                <label>자격증:</label>
                                <div id="files">
                                    <input type="file" className="form-control col-xs-3" onChange={handleFileChange}/>
                                </div>
                            </div>
                        </div>
                        {/* 자격증 */}
                        {/* 직업 입력 */}
                        <div className="mb-3"></div>
                        {/* 제출 버튼 */}
                        <button onClick={submitProfile}>프로필 제출</button>
                        {/* 목록으로 돌아가기 버튼 */}
                        <Link className="btn btn-outline-dark ms-2" to="/list">
                            목록
                        </Link>
                    </Form>

            </div>
            <div className="resume-container" style={{ backgroundColor: profileBackgroundColor }}>
                <div className="resume-header">
                    <h1>이력서</h1>
                </div>
                <div className="resume-content">
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
                                    data: profile.skills.split(',').map(skill => technicalSkills[skill] || 0),
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
            </div>

        </div>
        </>
    );
};
export default WritePage;