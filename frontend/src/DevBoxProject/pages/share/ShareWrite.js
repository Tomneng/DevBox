import React, {createContext, useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {faSwift} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";

import CLogo from "../../components/image/c.png"
import CPPLogo from "../../components/image/cpp.png"
import CSHARPLogo from "../../components/image/csharp.png"
import CSSLogo from "../../components/image/css.png"
import HTMLLogo from "../../components/image/html.png"
import JAVALogo from "../../components/image/java.png"
import JSLogo from "../../components/image/javascript.png"
import PYTHONLogo from "../../components/image/python.png"
import REACTLogo from "../../components/image/react.png"
import * as auth from "../../apis/auth";


import WriteCSS from "./CSS/ShareUpdateCSS.module.css"
import DefaultCSS from "./CSS/Default.module.css"
import Header from "../../components/Header";
import * as Swal from "../../apis/alert";

import {LoginContext} from "../../contexts/LoginContextProvider";
import Cookies from "js-cookie";


const ShareWrite = () => {
		const navigate = useNavigate();
		// 로그인 확인
		const {isLogin, userInfo} = useContext(LoginContext)

		const [share, setShare] = useState({
				stitle: '',
				scontent: '',
				slanguage: '',
				sdescription: '',
				userId: userInfo.userId,
		});

		// 빈 배열을 만든후 이 배열에 체크된 언어만 넣고 이 배열을 가지고 언어 아이콘을 보여줄 계획
		// const [language, setLanguage] = useState([]);
		if (Cookies.get("accessToken") === null) {
				console.log("if userInfo "+isLogin)
				Swal.alert("로그인 후 이용해주세요", "로그인 화면으로 갑니다", "success", () => {
						navigate("/login");

				});

		}

		const changeValue = (e) => {
				const {name, value, type, checked} = e.target;
				console.log("changeValue 에서 JSON.stringify(userInfo.userId) = " + JSON.stringify(userInfo.userId))
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
				e.preventDefault();
				console.log(share)
				//  POST request
				const response = await auth.codeShareWrite(share)
				const data = response.data

				console.log(`response`, response);
				console.log(`response.status`, response);
				if (response.status === 201) {
						// 201 CREATED 인 경우 성공
						if (data !== null) {
								console.log(`check! 작석완료`, data);
								navigate(`/codeshare/detail/${data.sid}`); //  이동
						} else {
								console.log(data)
								alert('실패!!!  뚜두둥 뚜두둥');
						}
				} else {
						console.log("response = " +  response)
						return null;
				}
		}
		return (
				<>
						<Header/>

						<Container className={DefaultCSS.main_wrapper}>
								<h2>Share</h2>
								<hr/>

								<Form onSubmit={submitShare}>

										{/* 사용 언어 태그 */}

										<Form.Group>
												<Form.Label>사용 언어</Form.Label>
												<Col className={WriteCSS.check_box}>
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

										{/*  글 제목 입력 란  */}
										<Form.Group>
												<Form.Label>제목 : </Form.Label>
												<Form.Control
														type={"text"}
														placeholder={"제목 입력"}
														onChange={changeValue}
														name={"stitle"}
														required/>
										</Form.Group>

										{/* 글 간략 설명*/}
										<Form.Group>
												<Form.Label>간략 설명 :</Form.Label>
												<Form.Control
														type={"text"}
														placeholder={"간략설명"}
														onChange={changeValue}
														name={"sdescription"}
														required/>
										</Form.Group>

										{/* 글 내용 입력란 */}
										<Form.Group>
												<Form.Label>코드 내용 :</Form.Label>
												<Form.Control
														type={"text"}
														placeholder={"내용 입력"}
														onChange={changeValue}
														name={"scontent"}
														required/>
										</Form.Group>

										{/* 코드 사진 첨부 */}

										<div className={DefaultCSS.button_box}>
												<Button type={"submit"}>나눔 하기</Button>
												<Link className={DefaultCSS.link_box} to="/codeshare">목록</Link>
										</div>
								</Form>
						</Container>
				</>
		);
};

export default ShareWrite;