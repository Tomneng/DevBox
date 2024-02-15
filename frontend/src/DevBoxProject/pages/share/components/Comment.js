import React, {useContext, useState} from 'react';

// auth
import * as auth from "../../../apis/auth";
// css
import commentCSS from "../CSS/Comment.module.css"
import * as Swal from "../../../apis/alert";
import {LoginContext} from "../../../contexts/LoginContextProvider";
import {useNavigate} from "react-router-dom";

const Comment = () => {
		const navigate = useNavigate();

		const {isLogin, userInfo} = useContext(LoginContext)
		const [comment, setComment] = useState({
				cContent: '',

		});
		if (!isLogin) {
				Swal.alert("로그인 후 이용해주세요", "로그인 화면으로 갑니다", "success", () => {
						navigate("/login");
				});
				return null;
		}
		const commentSubmit = async (e) => {
				e.preventDefault();
				const response = await auth.codeShareCommentWrite(comment)
				const data = response.data
				if (response.status === 201) {
						// 201 CREATED 인 경우 성공
						if (data !== null) {
								console.log(`check! 작석완료`, data);
						} else {
								alert('입력값 없음. 실패');
						}
				} else {
						return alert('작성 실패');
				}
		}

		return (
				<>
						<form className={commentCSS.input_box} onSubmit={commentSubmit}>
								<input
										type={"text"}
										placeholder={"댓글을 입력해주세요"}
										name={"cContent"}
								/>
								<button type={"submit"}>댓글 작성</button>
						</form>
						<span>comment.cid</span>
						<span>comment.cContent</span>
						<span>comment.cRegDate</span>

				</>
		);
};

export default Comment;