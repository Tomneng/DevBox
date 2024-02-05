import React, {useState} from 'react';
import '../CSS/LoginPage.css'
import Header from "../components/Header";
import {Container} from "react-bootstrap";
import LoginContextCounsumer from "../contexts/LoginContextCounsumer";
import RegisterForm from "../components/register/RegisterForm";
import * as auth from '../apis/auth'
import {Link, useNavigate} from "react-router-dom";
import * as Swal from '../apis/alert'

const RegisterPage = () => {

    const navigate = useNavigate();

    // 회원가입 요청
    const join = async (form) => {
        let response
        let data
        try {
            response = await auth.register(form)
        } catch (error) {
            console.error(`${error}`)
            console.error(`회원가입 요청 중 에러 발생`)
            return
        }
        data = response.data
        const status = response.status;
        console.log(`data : ${data}`)
        console.log(`status : ${status}`)

        if (status === 200) {
            Swal.alert("회원가입 성공", "메인화면으로 이동합니다.", "success", () => {
                navigate("/login")
            })

        } else {
            Swal.alert("회원가입 실패", "회원가입에 실패하였습니다.", "error")
        }

    }

    return (
        <>
            <div className="h1">
                <Link to="/">DEV BOX</Link>
            </div>
            <div className="container">
                <RegisterForm join={join}/>
            </div>
        </>
    );
};

export default RegisterPage;