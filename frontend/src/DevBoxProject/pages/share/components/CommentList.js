import React, {useContext, useEffect, useState} from 'react';

// auth
import * as auth from "../../../apis/auth";
// css
import commentCSS from "../CSS/Comment.module.css"
import * as Swal from "../../../apis/alert";
import {LoginContext} from "../../../contexts/LoginContextProvider";
import {useNavigate} from "react-router-dom";

const CommentList = (props) => {
		const {sid, userId} = props.share
		const navigate = useNavigate();

		const [commentList, setCommentList] = useState([]);

		const commentListData = async (sid) => {
				const response = await auth.codeShareCommentList(sid);
				const data = response.data;
				setCommentList(data)
		}
useEffect(() => {
		commentListData(sid);
},[]);

		return (
				<>
						<div>댓글 목록</div>
						{commentList.map(comment => (
								<div key={comment.cid}>
										<span>{comment.cid}</span>
										<span>{comment.ccontent}</span>
										<span>{comment.cRegDate}</span>
								</div>
						))}

				</>
		);
};

export default CommentList;
