import React, { useEffect, useState } from 'react';
import * as auth from "../../../apis/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";

const Ddabong = (props) => {
	const { share, user } = props;
	const [steam, setSteam] = useState({
		shareId: share.sid,
		userId: "" + user.id,
	});

	const [steamList, setSteamList] = useState([]);
	const [updated, setUpdated] = useState(false);

	const DdabongUpdate = () => {
		setUpdated(prevUpdated => !prevUpdated);
	};

	const deleteSteamValue = async () => {
		await auth.deleteSteam(share.sid, user.id);
		DdabongUpdate();
	};

	const plusSteamValue = async () => {
		await auth.plusSteam(steam);
		DdabongUpdate();
	};

	const getSteam = async () => {
		let response = await auth.getSteam(steam.shareId);
		let data = response.data;
		data.forEach(e => e.user.id == user.id && setUpdated(true));
		setSteamList(data);
	};

	useEffect(() => {
		getSteam();
	}, [updated]);

	return (
		<>
			<small>찜 : {steamList.length}</small>
			{updated ? (
				<FontAwesomeIcon
					icon={faThumbsUp}
					style={{ color: "#FFD43B" }}
					onClick={deleteSteamValue}
				/>
			) : (
				<FontAwesomeIcon icon={faThumbsUpRegular} onClick={plusSteamValue} />
			)}
		</>
	);
};

export default Ddabong;
