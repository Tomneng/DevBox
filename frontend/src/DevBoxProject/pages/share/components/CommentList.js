import React, { useEffect, useState } from 'react';
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

const deleteComment= async (cid) => {
		if (!window.confirm('삭제 하시겠습니까?')) return;
		await auth.codeShareCommentDelete(cid)
}
		console.log("props.share.commentList.cid = " + props.share.commentList.cid)
		console.log("props.share.commentList.userId = " + props.share.commentList.userId)
		console.log("JSON.stringify(props.share.commentList) = " + JSON.stringify(props.share.commentList))
		return (
				<>
						<div>댓글 목록</div>
						{

								commentList.map(comment => (
												<div key={comment.cid} className={CommentListCSS.comment_box}>

																<div>{comment.userId.nickname}</div>


														<div>{comment.ccontent}</div>
														<div>{comment.localDateTime}</div>
														{userInfo.id === comment.userId.id &&

																<div className={CommentListCSS.delete_btn}>
																		<FontAwesomeIcon onClick={deleteComment} icon={faXmark} style={{color: "#ff0000",}} />
																</div>
														}
												</div>
										)
								)}
				</>
		);
};

export default CommentList;
