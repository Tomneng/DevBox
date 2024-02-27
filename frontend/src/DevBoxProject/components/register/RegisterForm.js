import React from 'react';



const RegisterForm = ({join}) => {

    const onRegister = (e) => {
        e.preventDefault();
        const form = e.target
        const username = form.username.value
        const password = form.password.value
        const name = form.name.value
        const email = form.email.value
        console.log(username, password, name, email);

        join({username, password, name, email})
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={(e) => onRegister(e)}>
                <input type="text"
                       id="username"
                       placeholder='아이디'
                       name='username'
                       autoComplete='username'
                       required/>

                <input type="password"
                       id="password"
                       placeholder='비밀번호'
                       name='password'
                       autoComplete='password'
                       required/>


                <input type="text"
                       id="name"
                       placeholder='닉네임'
                       name='name'
                       autoComplete='name'
                       required/>


                <input type="text"
                       id="email"
                       placeholder='이메일'
                       name='email'
                       autoComplete='email'
                       required/>

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default RegisterForm;