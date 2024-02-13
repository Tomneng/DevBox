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
import ShareDetailCSS from "./CSS/ShareDetail.module.css"
import ListItemCSS from "./CSS/ShareListItemCSS.module.css"
import DefaultCSS from "./CSS/Default.module.css"
import * as auth from "../../apis/auth";
import * as Swal from "../../apis/alert";

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

		const codeShareDetail = async () => {
				const response = await auth.codeShareDetail(sid)
				const data = response.data

				setShare(data)
		}

		useEffect(() => {
				// fetch('http://localhost:8080/share/detail/' + sid)
				// 		.then(response => response.json())
				// 		.then(data => setShare(data));
				codeShareDetail()

		}, []);
		const deletePost = async () => {
				if (!window.confirm('삭제 할랍니꺼')) return;

				const response = await auth.codeShareDelete(sid)
				const status = response.status

				console.log(`status : ${status}`)

				if (status === 200) {
						console.log(`삭제 성공`)
						Swal.alert("삭제 성공", "성공했습니다. :)", "success")
				} else {
						console.log(`삭제 실패`)
						Swal.alert("삭제 실패", "실패했습니다. :(", "error")
				}

		};
		const updatePost = () => {
				navigate('/codeshare/update/' + sid);
		};

		return (
				<div className={DefaultCSS.main_wrapper}>
						<div className={ShareDetailCSS.codeshare_detail_header}>
								{/* 글제목 */}
								<h2>조회 : {share.stitle}</h2>

								{/* 조회수 */}
								<div className={ShareDetailCSS.view_box}>
										<small>조회수 : {share.sviewCnt}</small>
										<small>찜 : share.steam</small>
								</div>
						</div>

						<hr/>
						{/* 찜버튼 */}

						{/* 사용 언어*/}
						<div className={ListItemCSS.language_box_middle}>
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


						<div className={DefaultCSS.button_box}>
								<Button variant='outline-dark ' onClick={updatePost}>수정</Button>
								<Button variant='outline-danger' onClick={deletePost}>삭제</Button>
								<Link className={DefaultCSS.link_box} to="/codeshare/write">작성</Link>
								<Link className={DefaultCSS.link_box} to="/codeshare">목록</Link>
						</div>



						{/* 댓글 작성란*/}

						{/* 댓글 목록*/}


				</div>
		);
};

export default ShareDetail;