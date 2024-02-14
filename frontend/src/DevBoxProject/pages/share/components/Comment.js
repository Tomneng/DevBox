import React, {useState} from 'react';


const Comment = () => {
		const [comment, setComment] = useState({
				cid: '',
				cContent: '',
				cRegDate: '',
		});

		return (
				<>
						<input/>
						<span>comment.cid</span>
						<span>comment.cContent</span>
						<span>comment.cRegDate</span>

				</>
		);
};

export default Comment;