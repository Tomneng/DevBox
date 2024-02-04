import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import "./Header.css"
import {LoginContext} from "../contexts/LoginContextProvider";

const Header = () => {

    // isLogin이 true일때, false일때
    // logout : 로그아웃함수 setLogin(false)
    const {isLogin, login, logout} = useContext(LoginContext); // 리액트 특성상 페이지 이동이 없기에, routing을 해도 context는 변동없음

    return (
        <div className="header">
            <div className="top-nav">
                <div className="logo">
                    <Link to="/">
                        <div className="logo">
                        </div>
                    </Link>
                </div>

                <div className="navs">
                    <Link to="/codeShare">Code Share</Link>
                </div>
                <div className="navs">
                    <Link to="/errorLib">Error Library</Link>
                </div>
                <div className="navs">
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
            <div className="util">
                {!isLogin
                    ?
                    <div>
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                    </div>
                    :
                    <Link to="/mypage">MY</Link>
                }
            </div>
        </div>
    );
};

export default Header;