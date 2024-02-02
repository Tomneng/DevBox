import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ShareListItem from "../../components/ShareListItem";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faJava} from "@fortawesome/free-brands-svg-icons"

const ShareList = () => {
		// 원본 글 리스트
		const [shareList, setShareList] = useState([]);

		// 원본에서 필터링 할 검색어
		const [search, setSearch] = useState("");

		// 원본에서 필터링 한 리스트
		const [filteredList, setFilteredList] = useState([]);

		useEffect(() => {
				// shareList가 업데이트될 때마다 필터를 적용합니다.
				const filteredList = shareList.filter((share) =>
						share.stitle.includes(search)
				);
				setFilteredList(filteredList);
		}, [shareList]);

		useEffect(() => {
				fetch("http://localhost:8080/share/list")
						.then((response) => response.json())
						.then((data) => {
								console.log(data);
								setShareList(data);
						});
		}, []);

		const submitSearch = (e) => {
				e.preventDefault();

				// 검색어가 비어 있으면 전체 목록을 보여줍니다.
				if (search.trim() === "") {
						setFilteredList(shareList);
				} else {
						// 검색어가 비어있지 않은 경우에만 필터링을 수행합니다.
						const filteredList = shareList.filter((share) =>
								share.stitle.includes(search)
						);
						setFilteredList(filteredList);
				}
		};

		return (

				<Container>

						{/*content wrapper*/}
						<div className={"mt-5"}>
								<div className={"d-flex justify-content-between mb-4 p-4"}>
										<form className={"d-flex gap-2"} onSubmit={submitSearch}>
												<input
														type={"text"}
														placeholder={"검색"}
														value={search}
														onChange={(e) => setSearch(e.target.value)}
												/>
												<Button type={"submit"}>검색</Button>
										</form>
										<Row>
												<Col>
														<Button variant="outline-dark" href="/write">
																작성
														</Button>
												</Col>
										</Row>
								</div>
								<Row>
										<div className={"d-flex justify-content-start flex-lg-wrap align-content-start"}>

												{filteredList.map((share) => (
														share.spublic === "PUBLIC" && (
																<ShareListItem key={share.sid} share={share}/>)
												))}
										</div>
								</Row>

						</div>
				</Container>
		);
};

export default ShareList;
