import React, {useContext, useEffect, useState} from 'react';
import * as auth from "../../../apis/auth";


//  CSS
import CommentListCSS from "../CSS/CommentList.module.css"
import {LoginContext} from "../../../contexts/LoginContextProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {codeShareCommentDelete} from "../../../apis/auth";


const CommentList = (props) => {
		const {sid} = props.share;
		const {userInfo} = useContext(LoginContext)
		const [commentList, setCommentList] = useState([]);
		useEffect(() => {
				const fetchCommentList = async () => {
						try {
								const response = await auth.codeShareCommentList(sid);
								setCommentList(response.data);
								console.log(response.data)
						} catch (error) {
								console.error("Error fetching comment list:", error);
								// 에러 처리: 사용자에게 메시지 표시 또는 콘솔에 에러 기록
						}
				};

				fetchCommentList();
		}, [props.share.commentList]);


		const deleteComment = async (e) => {
				e.preventDefault();
				console.log(e.cid)
				if (!window.confirm('삭제 하시겠습니까?')) return;
			await 	auth.codeShareCommentDelete(e.cid)
		}
		return (
				<>
						<div>댓글 목록</div>
						{
								commentList.map(comment => (
										<form>
												<div key={comment.cid} className={CommentListCSS.comment_box}>

														<div>{comment.userId.nickname}</div>

														<div>{comment.cid}</div>
														<div>{comment.ccontent}</div>
														<div>{comment.localDateTime}</div>
														{userInfo.id === comment.userId.id &&

																<button className={CommentListCSS.delete_btn} onClick={deleteComment}>
																		<FontAwesomeIcon icon={faXmark} style={{color: "#ff0000",}}/>
																</button>
														}
												</div>
										</form>
										)
								)}
				</>
		);
};

export default CommentList;
