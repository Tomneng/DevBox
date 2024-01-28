import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Container} from "react-bootstrap";

const ShareDetail = () => {

		const navigate = useNavigate();
		let {sid} = useParams();

		const [share, setShare] = useState({
				sid: '',
				stitle: '',
				scontent: '',
				spublic: '',
				sviewCnt: '',
				sdescription: '',
		});
		useEffect(() => {
				fetch('http://localhost:8080/share/detail/' + sid)
						.then(response => response.json())
						.then(data => setShare(data));
		}, []);
		const deletePost = () => {
				if (!window.confirm('삭제 할랍니꺼')) return;
				fetch('http://localhost:8080/share/delete/' + sid, {
						method: 'DELETE',
				})
						.then()
						.then(response => response.text())
						.then(data => {
								console.log("data =" + data)
								if (data === "ok") {
										alert('삭제 성공');
										navigate('/list'); //  삭제 성공후 '목록' 화면으로
								} else {
										alert('삭제 실패');
								}
						});
		};
		const updatePost = () => {
				navigate('/update/' + sid);
		};

		return (
				<Container>
						<div className={"d-flex justify-content-between align-content-center position-relative"}>
								{/* 글제목 */}
								<h2>조회 : {share.stitle}</h2>

								{/* 조회수 */}
								<div className={"position-absolute bottom-0 end-0"}>
								<small>조회수 : {share.sviewCnt}</small>
								<small>찜 : share.steam</small>
								</div>
						</div>

						<hr/>

						{/* 간략 설명 */}
						<h4>간략설명</h4>
						<span>{share.sdescription}</span>

						{/* 글 내용 */}
						<h4>내용</h4>
						<span>{share.scontent}</span>


						<div className="d-flex">
								<Button variant='outline-dark ' onClick={updatePost}>수정</Button>
								<Button variant='outline-danger' className=' ms-2' onClick={deletePost}>삭제</Button>
								<Link className='btn btn-outline-dark ms-2' to="/write">작성</Link>
								<Link className='btn btn-outline-dark ms-2' to="/list">목록</Link>
						</div>

						{/* 추천버튼 */}
						{/* 채팅보내기 버튼*/}

						{/* 댓글 작성란*/}

						{/* 댓글 목록*/}


				</Container>
		);
};

export default ShareDetail;