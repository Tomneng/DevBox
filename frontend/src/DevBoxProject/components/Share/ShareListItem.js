import React from 'react';
import {Button, Card, Col, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import PYTHONLogo from "../image/python.png";
import JAVALogo from "../image/java.png";
import CLogo from "../image/c.png";
import CPPLogo from "../image/cpp.png";
import CSHARPLogo from "../image/csharp.png";
import HTMLLogo from "../image/html.png";
import CSSLogo from "../image/css.png";
import JSLogo from "../image/javascript.png";
import REACTLogo from "../image/react.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase} from "@fortawesome/free-solid-svg-icons";
import {faSwift} from "@fortawesome/free-brands-svg-icons";

import "../ShareCSS/ShareListItemCSS.css"

const ShareListItem = (props) => {
    const {sid, stitle, sdescription, sviewCnt, sregDate, spublic, slanguage} = props.share;
    return (


        <Col key={sid} xs={12} md={6} lg={4} className="mb-4 p-4">
            <Link to={`/detail/${sid}`} className={"text-decoration-none "}>


                <Card className="mb-4">
                    {/* 사진 부분 (이미지 URL이 있다고 가정) */}
                    {/*<Card.Img variant="top" src={imageURL} alt="Share Image"/>*/}

                    <Card.Body>
                        {/* overflow 시 ...으로 표시 */}
                        <Card.Title className={"text-truncate"}>{stitle}</Card.Title>
                        <Card.Text className={"text-truncate"}>
                            {/* 내용에 대한 간단한 설명 */}
                            {sdescription}
                        </Card.Text>
                        {/* 이건 사용 언어 아이콘 */}


                            <div className={"language-box-small d-flex"}>
                                {slanguage.includes("PYTHON") && <Image src={PYTHONLogo}/>}
                                {slanguage.includes("JAVA") && <Image src={JAVALogo}/>}
                                {slanguage.includes("BASICC") && <Image src={CLogo}/>}
                                {slanguage.includes("C++") && <Image src={CPPLogo}/>}
                                {slanguage.includes("C#") && <Image src={CSHARPLogo}/>}
                                {slanguage.includes("HTML") && <Image src={HTMLLogo}/>}
                                {slanguage.includes("CSS") && <Image src={CSSLogo}/>}
                                {slanguage.includes("JS") && <Image src={JSLogo}/>}
                                {slanguage.includes("REACT") && <Image src={REACTLogo}/>}
                        </div>
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
            </Link>
        </Col>

    );
};

export default ShareListItem;