import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

const ShareWrite = () => {

		const navigate = useNavigate();
		const [share, setShare] = useState({
				sid: '',
				stitle: '',
				scontent: '',
				slanguage: '',
				spublic: '',
				sdescription: '',
		});
		const changeValue = (e) => {
				setShare({
						...share,
						[e.target.name]: e.target.value,
				});
		};

		const submitShare = (e) => {
				e.preventDefault();

				//  POST request
				fetch('http://localhost:8080/share/write', {
						method: 'POST',
						headers: {
								'Content-Type': 'application/json;charset=utf-8', //  json 으로  리퀘스트
						},
						body: JSON.stringify(share),
				})
						.then((response) => {
								console.log(`response`, response);
								if (response.status === 201) {
										// 201 CREATED 인 경우 성공
										return response.json();
								} else {
										console.log(response)
										return null;
								}
						})
						.then((data) => {
								if (data !== null) {
										console.log(`check! 작석완료`, data);
										navigate(`/detail/${data.sid}`); //  이동
								} else {
										console.log(data)
										alert('실패!!!  뚜두둥 뚜두둥');
								}
						});
		}
		return (
				<Container>
						<h2>Share</h2>
						<hr/>

						<Form onSubmit={submitShare}>
								{/* 공개 여부 */}
								<Form.Group className={'d-flex gap-4'}>
										<Form.Label>공개 여부 : </Form.Label>

										<Form.Check
												type={"radio"}
												label={"Public"}
												id={"public"}
												name={"spublic"}
												value={"PUBLIC"}
												onChange={changeValue}
												defaultChecked={"PUBLIC"}/>
										{/*  작성시 기본값 true  */}

										{/*checked 속성은 share.spublic의 값에 따라 설정됩니다.
만약 share.spublic이 문자열 'true'와 같다면, 라디오 버튼은 초기에 선택된 상태가 되고,
그렇지 않으면 선택되지 않은 상태가 됩니다.*/}

										<Form.Check
												type={"radio"}
												label={"Private"}
												id={"Private"}
												name={"spublic"}
												value={"PRIVATE"}
												onChange={changeValue}/>

								</Form.Group>


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

								<div className={'mt-3'}>
										<Button type={"submit"}>나눔 하기</Button>
										<Link className='btn btn-outline-dark ms-2' to="/list">목록</Link>
								</div>
						</Form>
				</Container>
		);
};

export default ShareWrite;