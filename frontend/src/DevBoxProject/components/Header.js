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
        <header>
            <div className="logo">
                <Link to="/" >
                    <img src="https://i.imgur.com/fzADqJo.png" alt="logo"  className="logo"/>
                </Link>
            </div>
            <div className="until">
                { // 이게 조건부 렌더링 ㄷㄷ 씹상타취
                    !isLogin
                    ?
                        <ul>
                            <li><Link to="/login">로그인</Link> </li>
                            <li><Link to="/register">회원가입</Link> </li>
                            <li><Link to="/about">소개</Link> </li>
                            <li><Link to="/admin">관리자</Link> </li>
                        </ul>
                        :
                        <ul>
                            <li><Link to="/mypage">마이페이지</Link> </li>
                            <li><Link to="/admin">관리자</Link> </li>
                            <li><Button variant="primary" onClick={() => logout()}>로그아웃</Button></li>
                        </ul>
                }
            </div>
        </header>
    );
};

export default Header;