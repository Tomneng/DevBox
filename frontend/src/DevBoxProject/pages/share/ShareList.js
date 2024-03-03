import React, {useEffect, useState} from "react";
import ShareListItem from "./components/ShareListItem";
import Header from "../../components/Header";
import ShareListCSS from "./CSS/ShareList.module.css"
import {Link} from "react-router-dom";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons/faArrowUp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as auth from "../../apis/auth";
import DefaultCSS from "./CSS/Default.module.css"
const ShareList = () => {
		// 원본 글 리스트
		const [shareList, setShareList] = useState([]);

		const [steam, setSteam] = useState([])

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

		const codeShareList = async () => {
				try {
						const response = await auth.codeShareList();
						const data = response.data;
						setShareList(data);
				} catch (error) {
						console.error("Error fetching share list:", error)
				}
		}


		useEffect(() => {
				codeShareList()
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

				<>
						<Header/>
						{/*content wrapper*/}

						<div className={`${DefaultCSS.main_wrapper}`}>
								<div className={ShareListCSS.search_write_box}>
										<form className={`${ShareListCSS.search_box} line`} onSubmit={submitSearch}>
												<input
														type={"text"}
														placeholder={"검색"}
														value={search}
														onChange={(e) => setSearch(e.target.value)}
														className={"search-input"}
												/>
												<button className={"search-button"} type={"submit"}><FontAwesomeIcon icon={faArrowUp}/></button>
										</form>

										<Link to={"/codeshare/write"} className={ShareListCSS.write_button}>
												<button>
														작성
												</button>
										</Link>

								</div>

								<div className={ShareListCSS.content_container}>

										{filteredList.map((share) => (
														<ShareListItem key={share.sid} share={share}/>)
										)}
								</div>


						</div>
				</>
		);
};

export default ShareList;
