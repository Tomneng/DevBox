import React, {useContext, useState} from 'react';

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

		const [comment, setComment] = useState({
				cContent: '',
				userId: '',
				sid: '',
				cid: '',
				cRegDate: '',
		});


		return (
				<>
						<div>마 이기 리스트다</div>
						<span>{comment.cid}</span>
						<span>{comment.cContent}</span>
						<span>{comment.cRegDate}</span>

				</>
		);
};

export default CommentList;