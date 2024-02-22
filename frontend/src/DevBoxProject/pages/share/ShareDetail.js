import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
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
import * as Swal from "../../apis/alert";

// CSS
import ShareDetailCSS from "./CSS/ShareDetail.module.css"
import ListItemCSS from "./CSS/ShareListItemCSS.module.css"
import DefaultCSS from "./CSS/Default.module.css"

// 유저 확인
import {LoginContext} from "../../contexts/LoginContextProvider";
import Header from "../../components/Header";
import CommentList from "./components/CommentList";
import commentCSS from "./CSS/Comment.module.css";
import commentList from "./components/CommentList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons"
import {faThumbsUp as faThumbsUpRegular} from "@fortawesome/free-regular-svg-icons";

const ShareDetail = () => {
		// 유저 확인
		const {userInfo} = useContext(LoginContext)

		const navigate = useNavigate();
		let {sid} = useParams();

		const [share, setShare] = useState({
				sid: sid,
				stitle: '',
				scontent: '',
				spublic: '',
				sviewCnt: '',
				sdescription: '',
				slanguage: '',
				userId: '',
				commentList: [],
				steamList: [],
		});

		const [steam, setsteam] = useState({
				shareId: share.sid,
				userId: userInfo.userId,
		})
		console.log(share)
		const codeShareDetail = async () => {
				const response = await auth.codeShareDetail(sid)
				const data = response.data

				setShare(data)
				console.log("sid.sid = " + sid)

		}

		useEffect(() => {

				codeShareDetail(sid)

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

		//  댓글 작성


		const {isLogin} = useContext(LoginContext)
		const [comment, setComment] = useState({
				ccontent: '',
				userId: userInfo.userId,
				sid: sid,
		});

		const changeValueComment = (e) => {
				setComment({
						...comment,
						[e.target.name]: e.target.value,
						userId: userInfo.userId,
				});
		};
		const commentSubmit = async (e) => {
				e.preventDefault();
				if (!isLogin) {
						Swal.alert("로그인 후 이용해주세요", "로그인 화면으로 갑니다", "success", () => {
								navigate("/login");
						});
						return null;
				}
				const response = await auth.codeShareCommentWrite(comment)

				if (response.status === 201) {
						const newComment = response.data; // 새로운 댓글
						setShare(prevShare => ({
								...prevShare,
								commentList: [...prevShare.commentList, newComment], // 기존 댓글 목록에 새로운 댓글 추가
						}));
						console.log(`check! 작성완료`, newComment);
						console.log("share.commentList" + share.commentList)
						console.log("JSON.stringify(share.commentList)" + JSON.stringify(share.commentList))
						console.log("comment.cid = " + comment.cid)
						console.log("JSON.stringify(comment) = " + JSON.stringify(comment))
				} else {
						alert('작성 실패');
				}
		}
		console.log("JSON.stringify(comment) = " + JSON.stringify(comment))
		console.log("JSON.stringify(share) = " + JSON.stringify(share))


		const deleteSteamValue = async () => {
				const response = await auth.deleteSteam(steam.steamId);

				if (response.status === 201){

				}else {
						return null;
				}
		}

		const plusSteamValue = () => {
				auth.plusSteam(steam)
		}

		console.log("steam" + JSON.stringify(steam))
		console.log("steam.steamId" + JSON.stringify(steam.steamId))
		console.log("steam.userId" + JSON.stringify(steam.userId))
		console.log("steam.shareId" + JSON.stringify(steam.shareId))
		console.log(share)

		console.log(userInfo.userId)
		console.log(share.steamList)
		return (
				<>
						<Header/>
						<div className={DefaultCSS.main_wrapper}>
								<div className={ShareDetailCSS.codeshare_detail_header}>
										{/* 글제목 */}
										<h2>조회 : {share.stitle}</h2>

										{/* 조회수 */}
										<div className={ShareDetailCSS.view_box}>
												<small>조회수 : {share.sviewCnt}</small>
												<small>찜 : {share.steamList.length}</small>
												{share.steamList.some(steam => steam.userId === userInfo.userId)
												 ?
														<FontAwesomeIcon icon={faThumbsUp} style={{color: "#FFD43B",}} onClick={deleteSteamValue}/>
														: <FontAwesomeIcon icon={faThumbsUpRegular} onClick={plusSteamValue}/>}
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
										{userInfo.userId === share.userId.userId &&
												<>
														<button onClick={updatePost}>수정</button>
														<button onClick={deletePost}>삭제</button>
												</>}
										<Link className={DefaultCSS.link_box} to="/codeshare/write">작성</Link>
										<Link className={DefaultCSS.link_box} to="/codeshare">목록</Link>
								</div>


								{/* 댓글작성, 목록*/}

								<form className={commentCSS.input_box} onSubmit={commentSubmit}>
										<input
												type={"text"}
												placeholder={"댓글을 입력해주세요"}
												name={"ccontent"}
												onChange={changeValueComment}
										/>
										<button type={"submit"}>댓글 작성</button>
								</form>

								<hr/>
								<CommentList key={share.sid} share={share}/>
						</div>
				</>
		)
				;
};

export default ShareDetail;
