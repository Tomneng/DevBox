import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/Header";
import UserForm from "../../components/User/UserForm";
import * as auth from "../../apis/auth";
import {LoginContext} from "../../contexts/LoginContextProvider";
import {useNavigate} from "react-router-dom";
import * as Swal from "../../apis/alert";

const MyPage = () => {

    const [userInfo, setUserInfo] = useState()
    const {isLogin, roles, logout} = useContext(LoginContext)
    const navigate = useNavigate()

    // 회원 정보 조회 -
    const getuserInfo = async () => {
        // 비로그인 혹은 권한 없는 경우 로그인으로 이동
        if (!isLogin || !roles.isUser) {
            console.log(isLogin)
            console.log(roles.isUser)
            navigate("/login")
            return
        }
        const response = await auth.info()
        const data = response.data
        console.log(`getUserInfo`)
        console.log(data)
        setUserInfo(data)
    }
    // 회원 정보 수정
    const updateUser = async (form) => {
        console.log(form)

        let response
        let data

        try {
            response = await auth.update(form)
        } catch (error) {
            console.error(`${error}`)
            console.error(`회원 정보 수정중 에러 발생`)
            return
        }

        data = response.data
        const status = response.status
        console.log(`data : ${data}`)
        console.log(`status : ${status}`)

        if (status === 200) {
            console.log(`정보수정 성공`)
            // alert(`정보수정 성공`)
            Swal.alert("회원 수정 성공", "로그아웃 후, 다시 로그인 해주세요.", "success", () => {logout(true)})
        } else {
            console.log(`정보수정 실패`)
            Swal.alert("회원 수정 실패", "회원 수정에 실패 하였습니다.", "error")
        }
    }
    // 회원 탈퇴

    const deleteUser = async (userId) => {
        console.log(userId)

        let response
        let data
        try {
            response = await auth.remove(userId)
        } catch (error) {
            console.error(`${error}`)
            console.error(`회원 삭제중 에러 발생`)
            return
        }

        data = response.data
        const status = response.status
        console.log(`data : ${data}`)
        console.log(`status : ${status}`)

        if (status === 200) {
            console.log(`회원삭제 성공`)
            Swal.alert("회원 삭제 성공", "그동안 감사했습니다 :)", "success", () => {logout(true)})
        } else {
            console.log(`회원삭제 실패`)
            Swal.alert("회원 삭제 실패", "회원 탈퇴에 실패했습니다.", "error")
        }
    }

    useEffect(() => {
        if(!isLogin){
            return
        }
        getuserInfo()
    }, [isLogin]);

    return (
        <>
            <Header/>
            <div className="container">
                <h1>User</h1>
                <UserForm userInfo={userInfo} updateUser={updateUser} deleteuser={deleteUser}/>
            </div>
        </>
    );
};

export default MyPage;