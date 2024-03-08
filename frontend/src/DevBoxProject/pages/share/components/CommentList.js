import React, { useEffect, useState } from 'react';
import * as auth from "../../../apis/auth";


//  CSS
import CommentListCSS from "../CSS/CommentList.module.css"


const CommentList = (props) => {
		const { sid } = props.share;
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



		return (
				<>
						<div>댓글 목록</div>
						{

								commentList.map(comment => (
										<div key={comment.cid} className={CommentListCSS.comment_box}>
												<div>{comment.userId.username}</div>
												<div>{comment.ccontent}</div>
												<div>{comment.localDateTime}</div>
										</div>
								)
						)}
				</>
		);
};

export default CommentList;
