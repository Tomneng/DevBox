import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import './LoginForm.css'
import {LoginContext} from "../../contexts/LoginContextProvider";

const LoginForm = () => {

    const {login} = useContext(LoginContext);

    const onLogin = (e) => {
        e.preventDefault();

        const form = e.target
        const username = form.username.value
        const password = form.password.value

        // 데이터
        login(username, password);
    }

    return (
        <div className="form">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={(e) => onLogin(e)}>
                <div>
                    <label htmlFor="name">username</label>
                    <input type="text"
                           id="username"
                           placeholder='username'
                           name='username'
                           autoComplete='username'
                           required/>
                </div>

                <div>
                    <label htmlFor="password">username</label>
                    <input type="password"
                           id="password"
                           placeholder='password'
                           name='password'
                           autoComplete='password'
                           required/>
                </div>
                <Button type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;