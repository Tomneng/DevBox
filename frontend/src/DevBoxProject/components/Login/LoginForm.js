import React, {useContext, useEffect} from 'react';
import {Button} from "react-bootstrap";
import './LoginForm.css'
import {LoginContext} from "../../contexts/LoginContextProvider";
import {Link, useNavigate, useParams} from "react-router-dom";

const LoginForm = () => {

    const {login, handleOAuthRedirect} = useContext(LoginContext);
    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();

        const form = e.target
        const username = form.username.value
        const password = form.password.value

        // 데이터
        login(username, password);
    }

    const goRegister = () => {
        navigate('/register')
    }


    return (
        <div className="login-container">
            <form id="loginForm" onSubmit={(e) => onLogin(e)}>
                <input type="text" id="username" placeholder="아이디" name="username" autoComplete="username" required/>
                    <input type="password" id="password" placeholder="비밀번호" name="password" autoComplete="password" required/>
                        <button type="submit">로그인</button>
                        <button className="signup-button" type="button" onClick={goRegister}>회원가입</button>
                        <div className="oauth-container">
                            <Link className="btn btn-oauth" to="http://localhost:8080/oauth2/authorization/kakao">
                                <img src="img/ico_s_kakao_talk.png" alt="Kakao" />
                            </Link>
                            <Link className="btn btn-oauth" to="http://localhost:8080/oauth2/authorization/google">
                                <img src="/img/Googleimage.png" alt="Google" />
                            </Link>
                            <Link className="btn btn-oauth" to="http://localhost:8080/oauth2/authorization/naver">
                                <img src="/img/btnG_naver.png" alt="Naver" />
                            </Link>
                            <Link className="btn btn-oauth" to="http://localhost:8080/oauth2/authorization/facebook">
                                <img src="/img/Facebook_f_logo_(2019).svg" alt="Facebook" />
                            </Link>
                        </div>
            </form>
        </div>
    );
};

export default LoginForm;