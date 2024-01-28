import React, {useEffect, useState} from "react";

import {Button, Col, Container, Row,} from "react-bootstrap";
import ShareListItem from "../../components/ShareListItem";


const ShareList = () => {
		const [shareList, setShareList] = useState([]);
		useEffect(() => {
				fetch('http://localhost:8080/share/list')
						.then((response) => response.json())
						.then((data) => {
								console.log(data);
								setShareList(data);
						});
		}, []);


		return (
				<Container className={"p-5"}>
						<div className={"d-flex justify-content-between mb-4"}>
								<input
										type={"text"}
										placeholder={"검색"}
								/>
								<Row>
										<Col>
												<Button variant="outline-dark" href="/write">
														작성
												</Button>
										</Col>
								</Row>
						</div>
						<Row>
								<div>
										{shareList.map((share) => (
												<ShareListItem key={shareList.sid} share={share}/>
										))}
								</div>
						</Row>


				</Container>
		);
};

export default ShareList;
