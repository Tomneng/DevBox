import React, { useEffect, useState } from 'react';
import * as auth from "../../../apis/auth";
import { useNavigate } from "react-router-dom";


//  CSS
import CommentListCSS from "../CSS/CommentList.module.css"

const CommentList = (props) => {
		const { sid } = props.share;
		const navigate = useNavigate();
		const [commentList, setCommentList] = useState([]);
		const [loading, setLoading] = useState(true);

		useEffect(() => {
				const fetchCommentList = async () => {
						try {
								const response = await auth.codeShareCommentList(sid);
								setCommentList(response.data);
								console.log(response.data)
						} catch (error) {
								console.error("Error fetching comment list:", error);
								// 에러 처리: 사용자에게 메시지 표시 또는 콘솔에 에러 기록
						} finally {
								setLoading(false);
						}
				};

				fetchCommentList();
		}, [sid]);

		return (
				<>
						<div>댓글 목록</div>
						{loading ? (
								<div>Loading...</div>
						) : (

								commentList.map(comment => (
										<div key={comment.cid} className={CommentListCSS.comment_box}>
												<div>{comment.userId.username}</div>
												<div>{comment.ccontent}</div>
												<div>{comment.localDateTime}</div>
										</div>
								))
						)}
				</>
		);
};

export default CommentList;
