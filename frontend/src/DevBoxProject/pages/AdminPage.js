import React, {useContext, useEffect} from 'react';
import Header from "../components/Header";
import {LoginContext} from "../contexts/LoginContextProvider";
import {useNavigate} from "react-router-dom";
import * as Swal from "../apis/alert";

const AdminPage = () => {

    const {isLogin,userInfo, roles} = useContext(LoginContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLogin || !userInfo){
            // alert(`로그인이 필요합니다.`)
            // navigate("/login")
            Swal.alert("로그인이 필요합니다.", "로그인 화면으로 이동합니다.", "warning", () => {navigate("/login")})
            return;
        }
        if (!roles.isAdmin) {
            // alert(`권한이 없습니다.`)
            // navigate(-1)
            Swal.alert("권한이 없습니다.", "이전 화면으로 이동합니다", "warning", () => {navigate(-1)})
        }
    }, [userInfo]);


    return (
        <>
            <Header/>
            {
                isLogin && roles.isAdmin &&
                <>
                    <div className="container">
                        <h1>About</h1>
                        <hr/>
                        <h2>관리자 페이지</h2>
                        <center>
                            <img src="https://i.imgur.com/fzADqJo.png" alt="loading"/>
                        </center>
                    </div>
                </>
            }
        </>
    );
};

export default AdminPage;