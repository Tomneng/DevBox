import React, {useEffect, useState} from 'react';
import * as auth from "../../../apis/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp as faThumbsUpRegular} from "@fortawesome/free-regular-svg-icons";



const Ddabong = (props) => {
	const [updated, setUpdated] = useState(false);


		const {share, user} = props
		const [steam, setSteam] = useState({
				shareId: share.sid,
				userId: user.id,
		})
	const DdabongUpdate = () => {
		setUpdated(!updated); // 상태 토글
	};

		const deleteSteamValue = async () => {
				await auth.deleteSteam(share.sid, user.id);
			DdabongUpdate();
			console.log()
		}

		const plusSteamValue = async () => {
				await auth.plusSteam(steam);
			DdabongUpdate();
		}

		const getSteam = async () => {
			let response = await auth.getSteam(steam.shareId)
			let data = response.data
		}
	useEffect(() => {
		getSteam()
	}, [updated]);


		return (
				<>
						<small>찜 : {share.steamList.length}</small>
						{share.steamList.some(steamList => steamList.user.id === user.id)
								?
								<FontAwesomeIcon icon={faThumbsUp} style={{color: "#FFD43B",}} onClick={deleteSteamValue}/>
								: <FontAwesomeIcon icon={faThumbsUpRegular} onClick={plusSteamValue}/>}
				</>
		);
};

export default Ddabong;
