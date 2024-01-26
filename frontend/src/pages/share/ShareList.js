import React, {useEffect, useState} from "react";

import {Button, Card, Col, Container, Row,} from "react-bootstrap";
import {Link} from "react-router-dom";


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
						<Row>{shareList.map((share) => (
								<Col key={share.sid} xs={12} md={4}>
										<Card className="mb-4">
												{/* 사진 부분 (이미지 URL이 있다고 가정) */}
												<Card.Img variant="top" src={share.imageURL} alt="Share Image"/>

												<Card.Body>
														<Card.Title>{share.stitle}</Card.Title>
														<Card.Text>
																{/* 내용에 대한 간단한 설명 */}
																{share.sdescription}
														</Card.Text>
														<Link to={`/detail/${share.sid}`}>
																<Button variant="primary">자세히 보기</Button>
														</Link>
												</Card.Body>

												<Card.Footer>
														<div className={"d-flex justify-content-between"}>
																<small className="text-muted">작성일: {share.sregDate}</small>
																<div>
																		<small className="text-muted pr-3">조회: {share.sviewCnt}</small>
																		<small className="text-muted pr-3">찜: 0 </small>
																</div>
														</div>
												</Card.Footer>
										</Card>
								</Col>
						))}</Row>


				</Container>
		);
};

export default ShareList;
