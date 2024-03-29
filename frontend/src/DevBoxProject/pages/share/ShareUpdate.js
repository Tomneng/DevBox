import React, {useContext, useEffect, useRef, useState} from 'react';
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

import * as auth from "../../apis/auth";

import Header from "../../components/Header";
import * as Swal from "../../apis/alert";
import loginContextProvider, {LoginContext} from "../../contexts/LoginContextProvider";
import Cookies from "js-cookie";

//  css
import WriteCSS from "./CSS/ShareUpdateCSS.module.css";
import DefaultCSS from "./CSS/Default.module.css";

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Quill의 스타일시트 가져오기
import 'quill/dist/quill.core.css'; // Quill의 스타일시트 가져오기
const ShareUpdate = () => {

		let {sid} = useParams();
		const navigate = useNavigate();
		const { isLogin} = useContext(LoginContext);
		const [share, setShare] = useState({
				sid: '',
				stitle: '',
				scontent: '',
				sregDate: '',
				sdescription: '',
				slanguage: '',
		})


		const getCodeShareDetail = async () => {
				const response = await auth.codeShareDetail(sid)
				const data = response.data
				setShare(data)
				console.log(data)
		}


		useEffect(() => {
				console.log("useEffect userInfo "+isLogin)
				console.log("useEffect JSON.stringify(userInfo) "+ JSON.stringify(isLogin))

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
				e.preventDefault(); // 기본 subimt 동작 차단
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
		if (Cookies.get("accessToken") === null) {
				console.log("if userInfo "+isLogin)
				Swal.alert("로그인 후 이용해주세요", "로그인 화면으로 갑니다", "success", () => {
						navigate("/login");

				});

		};


		// React - Quill
		const quillRef = useRef(null);

		const removeCodeBlock = () => {
				const editor = quillRef.current.getEditor();
				if (editor) {
						const range = editor.getSelection();
						if (range) {
								const [block, offset] = editor.getLine(range.index);
								if (block && block.statics.blotName === 'code-block') {
										const length = block.length();
										editor.deleteText(range.index, length);
								}
						}
				}
		};
		const modules = {
				toolbar: {
						container: [
								['image'],
								[{ header: [1, 2, 3, 4, 5, false] }],
								['bold', 'italic', 'underline', 'strike'],
								[{ 'code-block': 'code-block' }],
						],
				},
		};

		const formats = [
				'bold', 'italic', 'underline', 'strike',
				'list', 'bullet',
				'code-block',
				'link', 'image',
		];




		return (
				<>
						<Header/>
						<div className={DefaultCSS.main_wrapper}>
								<h2>수정 : {share.stitle}</h2>
								<hr/>
								<div>
										<Row>
												<Col>
														<span>id: {share.sid}</span>

														<span className="ms-4">
              작성일: {share.sregDate}

            </span>
														<span className="me-2">조회수: {share.sviewCnt}</span>
												</Col>
										</Row>
								</div>


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
														checked={share.slanguage.includes("PYTHON")}
												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"JAVA"}
														label={"JAVA"}
														onChange={changeValue}
														checked={share.slanguage.includes("JAVA")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"BASICC"}
														label={"C"}
														onChange={changeValue}
														checked={share.slanguage.includes("BASICC")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"C++"}
														label={"C++"}
														onChange={changeValue}
														checked={share.slanguage.includes("C++")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"C#"}
														label={"C#"}
														onChange={changeValue}
														checked={share.slanguage.includes("C#")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"HTML"}
														label={"HTML"}
														onChange={changeValue}
														checked={share.slanguage.includes("HTML")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"CSS"}
														label={"CSS"}
														onChange={changeValue}
														checked={share.slanguage.includes("CSS")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"JS"}
														label={"JS"}
														onChange={changeValue}
														checked={share.slanguage.includes("JS")}

												/>
												<Form.Check
														type={"checkbox"}
														name={"slanguage"}
														value={"REACT"}
														label={"REACT"}
														onChange={changeValue}
														checked={share.slanguage.includes("REACT")}

												/>
										</Col>
								</Form.Group>


								{/* 사용 언어 아이콘*/}
								<div>
										{share.slanguage.includes("PYTHON") && <Image src={PYTHONLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("JAVA") && <Image src={JAVALogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("BASICC") && <Image src={CLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("C++") && <Image src={CPPLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("C#") && <Image src={CSHARPLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("HTML") && <Image src={HTMLLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("CSS") && <Image src={CSSLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("JS") && <Image src={JSLogo} className={WriteCSS.skillImg}/>}
										{share.slanguage.includes("REACT") && <Image src={REACTLogo} className={WriteCSS.skillImg}/>}
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


										{/* 글 간략 설명*/}
										<Form.Group>
												<Form.Label>간략 설명 :</Form.Label>
												<Form.Control
														type={"text"}
														placeholder={"간략설명"}
														onChange={changeValue}
														name={"sdescription"}
														value={share.sdescription}
														required/>
										</Form.Group>

										{/* 내용 */}
										<Form.Group className="my-3" controlId="formBasicScontent">
												<Form.Label>내용 : </Form.Label>
												<ReactQuill
														ref={quillRef}
														style={{width: "800px", height: "500px"}}
														value={share.scontent}
														onChange={(value) => setShare({...share, scontent: value})}
														modules={modules}
														formats={formats}
														placeholder={"내용 입력"}
														required/>
										</Form.Group>

										<div className={DefaultCSS.button_box}>
												<Button variant="outline-dark" type="submit">
														작성완료
												</Button>
												<Button variant='outline-dark' className='ms-1' onClick={() => navigate(-1)}>이전으로</Button>
												<Link className={DefaultCSS.link_box} to="/codeshare">
														목록
												</Link>
										</div>
								</Form>
						</div>
				</>
		);
};

export default ShareUpdate;