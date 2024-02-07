import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Container, Image} from "react-bootstrap";
import PYTHONLogo from "../../components/image/python.png";
import JAVALogo from "../../components/image/java.png";
import CLogo from "../../components/image/c.png";
import CPPLogo from "../../components/image/cpp.png";
import CSHARPLogo from "../../components/image/csharp.png";
import HTMLLogo from "../../components/image/html.png";
import CSSLogo from "../../components/image/css.png";
import JSLogo from "../../components/image/javascript.png";
import REACTLogo from "../../components/image/react.png";
import "./CSS/ShareDetail.module.css"
import "./CSS/ShareListItemCSS.module.css"

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
				slanguage: '',
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
				<div className={"main-wrapper"}>
						<div className={"codeshare-detail-header"}>
								{/* 글제목 */}
								<h2>조회 : {share.stitle}</h2>

								{/* 조회수 */}
								<div className={"view-box"}>
										<small>조회수 : {share.sviewCnt}</small>
										<small>찜 : share.steam</small>
								</div>
						</div>

						<hr/>
						{/* 사용 언어*/}
						<div className={"language-box-middle"}>
								{share.slanguage.includes("PYTHON") && <Image src={PYTHONLogo}/>}
								{share.slanguage.includes("JAVA") && <Image src={JAVALogo}/>}
								{share.slanguage.includes("BASICC") && <Image src={CLogo}/>}
								{share.slanguage.includes("C++") && <Image src={CPPLogo}/>}
								{share.slanguage.includes("C#") && <Image src={CSHARPLogo}/>}
								{share.slanguage.includes("HTML") && <Image src={HTMLLogo}/>}
								{share.slanguage.includes("CSS") && <Image src={CSSLogo}/>}
								{share.slanguage.includes("JS") && <Image src={JSLogo}/>}
								{share.slanguage.includes("REACT") && <Image src={REACTLogo}/>}
						</div>


						{/* 간략 설명 */}
						<h4>간략 설명</h4>
						<span>{share.sdescription}</span>

						{/* 글 내용 */}
						<h4>내용</h4>
						<span>{share.scontent}</span>


						<div className="button-box">
								<Button variant='outline-dark ' onClick={updatePost}>수정</Button>
								<Button variant='outline-danger' className=' ms-2' onClick={deletePost}>삭제</Button>
								<Link className='btn btn-outline-dark ms-2' to="/codeshare/write">작성</Link>
								<Link className='btn btn-outline-dark ms-2' to="/codeshare">목록</Link>
						</div>

						{/* 추천버튼 */}
						{/* 채팅보내기 버튼*/}

						{/* 댓글 작성란*/}

						{/* 댓글 목록*/}


				</div>
		);
};

export default ShareDetail;