import React from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";

const ShareListItem = (props) => {
		const {sid,stitle, sdescription, sviewCnt, sregDate, spublic } =  props.share;
		return (

				<Col key={sid}  xs={12} md={6} lg={4} className="mb-4 p-4" >

						<Card className="mb-4">
								{/* 사진 부분 (이미지 URL이 있다고 가정) */}
								{/*<Card.Img variant="top" src={imageURL} alt="Share Image"/>*/}

								<Card.Body>
										<Card.Title>{stitle}</Card.Title>
										<Card.Text>
												{/* 내용에 대한 간단한 설명 */}
												{sdescription}
										</Card.Text>
										<Link to={`/detail/${sid}`}>
												<Button variant="primary">자세히 보기</Button>
										</Link>
								</Card.Body>

								<Card.Footer>
										<div className={"d-flex justify-content-between"}>
												<small className="text-muted">작성일: {sregDate}</small>
												<div>
														<small className="text-muted pr-3">조회: {sviewCnt}</small>
														<small className="text-muted pr-3">찜: 0 </small>
												</div>
										</div>
								</Card.Footer>
						</Card>
				</Col>

		);
};

export default ShareListItem;