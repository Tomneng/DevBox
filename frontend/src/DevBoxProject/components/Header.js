import React, {useContext} from 'react';
import {Link} from "react-router-dom";
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
                    <div className="nav">
                    <Link to="/codeShare">Code Share</Link>
                    </div>
                    <div className="nav">
                    <Link to="/myDoc/list">Dev Library</Link>
                    </div>
                    <div className="nav">
                    <Link to="/profile">Profile</Link>
                    </div>
                    {!isLogin ? (
                        <>
                            <div className="nav">
                                <Link to="/login">Login</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="nav">
                                <Link to="/mypage">MY</Link>
                            </div>
                            <button onClick={logout}>logout</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;