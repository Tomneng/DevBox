import React, {useEffect, useState} from "react";

import {Button, Col, Container, Row, Table} from "react-bootstrap";
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
				<Container>
						<h1>글 리스트</h1>
						<hr/>
						<Table hover>
								<thead className="table-success">
								<tr>
										<th>#</th>
										<th>사진</th>
										<th>제목</th>
										<th>조회 수</th>
										<th>찜 수</th>
										<th>작성일</th>
								</tr>
								</thead>
								<tbody>
								{shareList.map((share) => (<tr key={share.sid}>
										<td>{share.sid}</td>
										<td>{share.sid}</td>
										<td><Link to={`/detail/${share.sid}`}>{share.stitle}</Link></td>
										<td>조회수 </td>
										<td>찜수 </td>
										<td>{share.sregDate} </td>



								</tr>))}
								</tbody>
						</Table>
						<Row>
								<Col className={'xs-12'}>
										<Button variant="outline-dark" href="/write">
												작성
										</Button>
								</Col>
						</Row>

				</Container>);
};

export default ShareList;
