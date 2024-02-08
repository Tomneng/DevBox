import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap";
import PYTHONLogo from "../../components/image/python.png";
import JAVALogo from "../../components/image/java.png";
import CLogo from "../../components/image/c.png";
import CPPLogo from "../../components/image/cpp.png";
import CSHARPLogo from "../../components/image/csharp.png";
import HTMLLogo from "../../components/image/html.png";
import CSSLogo from "../../components/image/css.png";
import JSLogo from "../../components/image/javascript.png";
import REACTLogo from "../../components/image/react.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";
import {faSwift} from "@fortawesome/free-brands-svg-icons";
import * as auth from "../../apis/auth";

const ShareUpdate = () => {

		let {sid} = useParams();
		const navigate = useNavigate();

		const [share, setShare] = useState({
				sid: '',
				stitle: '',
				scontent: '',
				spublic: '',
				sregDate: '',
				sdescription: '',
				slanguage: '',
		})



		const getCodeShareDetail = async () => {
				const response = await auth.codeShareDetail(sid)
				const data = response.data
				setShare(data)
		}


		useEffect(() => {
				getCodeShareDetail(sid)
		}, []);

		const changeValue = (e) => {
				const {name, value, type, checked} = e.target;

				setShare((prevShare) => {
						if (type === 'checkbox') {

								return {
										...prevShare,
										[name]: checked
												? prevShare[name].length > 0
														? `${prevShare[name]},${value}`
														: value
												: prevShare[name]
														.split(',')
														.filter((item) => item !== value)
														.join(',')
								};
						} else {
								// 그 외의 경우 value 값을 사용
								return {
										...prevShare,
										[name]: value,
								};
						}
				});
		};

		const submitShare = async (e) => {
				e.preventDefault(); // 기본 subimt 동작 차단.

				//  PUT request
				const response = await auth.codeShareUpdate(share)
				const data = response.data

				console.log(`response`, response);
				if (response.status === 200) {  //  200
						// 201 CREATED 인 경우 성공
						if (data !== null) {
								alert(`CRISTAL 완료`)
								navigate(`/codeshare/detail/${data.sid}`); //  이동
						} else {
								alert('실패!!!  뚜두둥 뚜두둥');
						}
				} else {
						return null;
				}


		};

		console.log(share.spublic)
		return (
				<Container mt={3}>
						<h2>수정 : {share.stitle}</h2>
						<hr/>
						<div className="mb-3 mt-3 clearfix">
								<Row>
										<Col xs={6} className="d-flex justify-content-start me-2">
												<span>id: {share.sid}</span>

												<span className="ms-4">
              작성일: {share.sregDate}

            </span>
												<span className="me-2">조회수: {share.sviewCnt}</span>
										</Col>
								</Row>
						</div>

						<Form onSubmit={submitShare}>
								{/* 제목 */}
								<Form.Group className="my-3" controlId="formBasicStitle">
										<Form.Label>제목 :</Form.Label>
										<Form.Control
												type="text"
												value={share.stitle}
												onChange={changeValue}
												name={"stitle"}
										/>
								</Form.Group>
								{/* 공개여부 */}
								<Form.Group className={'d-flex gap-4'} controlId="formBasicSpublic">

										<Form.Label>공개 여부</Form.Label>
										<Form.Check
												type={"radio"}
												label={"Public"}
												id={"public"}
												name={"spublic"}
												value={"PUBLIC"}
												checked={share.spublic === "PUBLIC"}
												onChange={changeValue}/>

										{/*checked 속성은 share.spublic의 값에 따라 설정됩니다.
만약 share.spublic이 문자열 'true'와 같다면, 라디오 버튼은 초기에 선택된 상태가 되고,
그렇지 않으면 선택되지 않은 상태가 됩니다.*/}

										<Form.Check
												type={"radio"}
												label={"Private"}
												id={"Private"}
												name={"spublic"}
												value={"PRIVATE"}
												checked={share.spublic === "PRIVATE"}
												onChange={changeValue}/>

								</Form.Group>
								{/* 사용 언어 태그 */}

								<Form.Group>
										<Form.Label>사용 언어</Form.Label>
										<Col className={"d-flex gap-3 flex-wrap justify-content-start"}>

												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"PYTHON"}
														label={"PYTHON"}
														onChange={changeValue}
												/>

												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"JAVA"}
														label={"JAVA"}
														onChange={changeValue}
												/>

												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"BASICC"}
														label={"C"}
														onChange={changeValue}
												/>

												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"C++"}
														label={"C++"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"C#"}
														label={"C#"}
														onChange={changeValue}
												/>


												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"HTML"}
														label={"HTML"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"CSS"}
														label={"CSS"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"JS"}
														label={"JS"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"REACT"}
														label={"REACT"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"GO LANG"}
														label={"GO LANG"}
														onChange={changeValue}
												/>


												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"TYPE SCRIPT"}
														label={"TYPE SCRIPT"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"SQL"}
														label={"SQL"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"KOTLIN"}
														label={"KOTLIN"}
														onChange={changeValue}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"SWIFT"}
														label={"SWIFT"}
														onChange={changeValue}
												/>
										</Col>
								</Form.Group>

								{/* 사용 언어 아이콘*/}
								<div>
										{share.slanguage.includes("PYTHON") && <Image src={PYTHONLogo}/>}
										{share.slanguage.includes("JAVA") && <Image src={JAVALogo}/>}
										{share.slanguage.includes("BASICC") && <Image src={CLogo}/>}
										{share.slanguage.includes("C++") && <Image src={CPPLogo}/>}
										{share.slanguage.includes("C#") && <Image src={CSHARPLogo}/>}
										{share.slanguage.includes("HTML") && <Image src={HTMLLogo}/>}
										{share.slanguage.includes("CSS") && <Image src={CSSLogo}/>}
										{share.slanguage.includes("JS") && <Image src={JSLogo}/>}
										{share.slanguage.includes("REACT") && <Image src={REACTLogo}/>}
										{share.slanguage.includes("SQL") && <FontAwesomeIcon icon={faDatabase}/>}
										{share.slanguage.includes("SWIFT") && <FontAwesomeIcon icon={faSwift}/>}
								</div>

								{/* 내용 */}
								<Form.Group className="my-3" controlId="formBasicScontent">
										<Form.Label>내용 : </Form.Label>
										<Form.Control
												type="text"
												value={share.scontent}
												onChange={changeValue}
												name="scontent"
										/>
								</Form.Group>

								<Button variant="outline-dark" type="submit">
										작성완료
								</Button>
								<Button variant='outline-dark' className='ms-1' onClick={() => navigate(-1)}>이전으로</Button>
								<Link className="btn btn-outline-dark ms-2" to="/codeshare">
										목록
								</Link>
						</Form>
				</Container>
		);
};

export default ShareUpdate;