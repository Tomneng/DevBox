import React from 'react';
import {Link} from "react-router-dom";
import PYTHONLogo from "../../../components/image/python.png";
import JAVALogo from "../../../components/image/java.png";
import CLogo from "../../../components/image/c.png";
import CPPLogo from "../../../components/image/cpp.png";
import CSHARPLogo from "../../../components/image/csharp.png";
import HTMLLogo from "../../../components/image/html.png";
import CSSLogo from "../../../components/image/css.png";
import JSLogo from "../../../components/image/javascript.png";
import REACTLogo from "../../../components/image/react.png";

import ShareListItemCSS from "../CSS/ShareListItemCSS.module.css"

const ShareListItem = (props) => {
    const {sid, stitle, sdescription, sviewCnt, sregDate, slanguage} = props.share;
    return (


        <div key={sid} className={`${ShareListItemCSS.share_item_box}`}>

            <Link to={`/codeshare/detail/${sid}`} >


                <div>
                    {/* 사진 부분 (이미지 URL이 있다고 가정) */}
                   <div>여기는 사진 넣을꼬얌</div>


                    <div>
                        {/* overflow 시 ...으로 표시 */}
                        <div className={`${ShareListItemCSS.text_truncate}`}>{stitle}</div>
                        <div className={`${ShareListItemCSS.text_truncate}`}>
                            {/* 내용에 대한 간단한 설명 */}
                            {sdescription}
                        </div>
                        {/* 이건 사용 언어 아이콘 */}


                            <div className={`${ShareListItemCSS.language_box_small} d-flex`}>
                                {slanguage.includes("PYTHON") && <img src={require("../../../components/image/python.png")} alt="Python Logo" />}
                                {slanguage.includes("JAVA") && <img src={require("../../../components/image/java.png")} alt="Java Logo" />}
                                {slanguage.includes("BASICC") && <img src={require("../../../components/image/c.png")} alt="C Logo" />}
                                {slanguage.includes("C++") && <img src={require("../../../components/image/cpp.png")} alt="C++ Logo" />}
                                {slanguage.includes("C#") && <img src={require("../../../components/image/csharp.png")} alt="C# Logo" />}
                                {slanguage.includes("HTML") && <img src={require("../../../components/image/html.png")} alt="HTML Logo" />}
                                {slanguage.includes("CSS") && <img src={require("../../../components/image/css.png")} alt="CSS Logo" />}
                                {slanguage.includes("JS") && <img src={require("../../../components/image/javascript.png")} alt="JavaScript Logo" />}
                                {slanguage.includes("REACT") && <img src={require("../../../components/image/react.png")} alt="React Logo" />}
                        </div>
                    </div>

                    <div>
                        <div className={"d-flex justify-content-between"}>
                            <small className="text-muted">작성일: {sregDate}</small>
                            <div>
                                <small className="text-muted pr-3">조회: {sviewCnt}</small>
                                <small className="text-muted pr-3">찜: 0 </small>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    );
};

export default ShareListItem;