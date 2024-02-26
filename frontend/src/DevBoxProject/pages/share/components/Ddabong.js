import React, { useState} from 'react';
import * as auth from "../../../apis/auth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp as faThumbsUpRegular} from "@fortawesome/free-regular-svg-icons";


const Ddabong = (props) => {


		const {share, user, updated, onUpdated} = props
		const [steam, setSteam] = useState({
				shareId: share.sid,
				userId: user.userId,
		})
		const deleteSteamValue = async () => {
				await auth.deleteSteam(share.sid, user.userId);
				onUpdated();
		}

		const plusSteamValue = async () => {
				await auth.plusSteam(steam);
				onUpdated();
		}


		return (
				<>
						<small>찜 : {share.steamList.length}</small>
						{share.steamList.some(steamList => steamList.user.userId === user.userId)
								?
								<FontAwesomeIcon icon={faThumbsUp} style={{color: "#FFD43B",}} onClick={deleteSteamValue}/>
								: <FontAwesomeIcon icon={faThumbsUpRegular} onClick={plusSteamValue}/>}
				</>
		);
};

export default Ddabong;
