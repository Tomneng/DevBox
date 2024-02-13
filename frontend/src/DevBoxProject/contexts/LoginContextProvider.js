import React, {createContext, useEffect, useState} from 'react';
import api from "../apis/api";
import Cookies from 'js-cookie'
import * as auth from '../apis/auth'
import {useNavigate} from "react-router-dom";
import * as Swal from '../apis/alert'


export const LoginContext = createContext();
LoginContext.displayName = "LoginContextName"

/**
 * 로그인
 * 로그인 체크
 * 로그인 요청
 * 로그 아웃 요청
 */
const LoginContextProvider = ({children}) => {
    /*-------------------------------[State]-------------------------------*/
    // - 로그인 여부, 유저 정보, 권한 정보, 아이디 저장

    // context value : 로그인 여부, 로그아웃 함수
    const [isLogin, setLogin] = useState(false);

    // 유저 정보
    const [userInfo, setUserInfo] = useState({});

    // 권한 정보
    const [roles, setRoles] = useState({isUser: false, isAdmin: false})

    // 아이디 저장
    const [rememberUserId, setRemberUserId] = useState();

    /*--------------------------------------------------------------------*/

    const navigate = useNavigate();


    /**
     *
     * 로그인 체크
     * - 쿠키에 jwt 가 있는지 확인
     * - jwt 로 사용자 정보를 요청
     *
     */
    const loginCheck = async () => {

        // 쿠키에서 jwt 토큰 가져오기
        const accessToken = Cookies.get("accessToken")
        console.log(`accessToken : ${accessToken}`);


        // accessToken (jwt) 이 없음
        if (!accessToken) {
            console.log(`쿠키에 accessToken(jwt)이 없음`);
            logoutSetting()
            return
        }

        // accessToken (jwt) 이 있음

        // header 에 jwt 담기
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 사용자 정보 요청
        let response
        let data
        try {
            response = await auth.info()

        } catch (error) {
            console.log(`error : ${error}`);
            console.log(`status : ${response.status}`);
            return;
        }

        data = response.data
        console.log(`data : ${data}`);

        // 인증 실패
        if (data === 'UNATURHIZED' || response.status === 401) {
            console.error(`accessToken 이 만료되었거나 인증에 실패함`)
            return;
        }


        // 인증 성공
        console.log(`accessToken 으로 사용자 인증정보 요청 성공`)

        // 로그인 세팅
        loginSetting(data, accessToken);
    }


    // 로그인
    const login = async (username, password) => {
        console.log(`username : ${username}`)
        console.log(`password : ${password}`)

        try {
            const response = await auth.login(username, password);
            const data = response.data;
            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization
            const accessToken = authorization.replace("Bearer ", "") // 최종적으로 이게 JWT

            console.log(`data : ${data}`)
            console.log(`status : ${status}`)
            console.log(`headers : ${headers}`)
            console.log(`authorization : ${authorization}`)
            console.log(`accessToken : ${accessToken}`)

            // 로그인 성공
            if (status === 200) {
                // 쿠키에 accessToken(jwt) 저장
                Cookies.set("accessToken", accessToken) // 이게 JWT임

                // 로그인 체크 (/user/{userId} <--- userData )
                loginCheck();

                //
                Swal.alert("로그인 성공", "메인 화면으로 갑니다", "success", () => {
                    navigate("/")
                });

            }
        } catch (error) {
            // 로그인 실패
            Swal.alert(`로그인 실패`, `아이디 또는 비밀번호가 일치하지 않습니다.`, "error")
        }

    }

    // 로그아웃
    const logout = (force=false) => {
        if (force){
            logoutSetting()

            navigate("/")
            return
        }
        // const check = window.confirm("로그아웃 하시겠습니까?")

        Swal.confirm("로그아웃 하시겠습니까?", "로그아웃을 진행합니다", "warning",
            (result) => {
                if (result.isConfirmed) {
                    logoutSetting()

                    navigate("/")
                }
            }
        )

        // if (check) {
        //     // 로그아웃
        //     logoutSetting();
        //     // 메인이동
        //     navigate("/");
        // }
    }

    // 로그인 세팅
    const loginSetting = (userData, accessToken) => {
        const {userId, username, authorities} = userData;
        const roleList = authorities;

        console.log(`id : ${userId}`);
        console.log(`username : ${username}`);
        console.log(`authList : ${authorities}`);
        console.log(`roleList : ${roleList}`);

        // axios 객체의 header(Authorization : Bearer ${accessToken})
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        // 로그인 여부 : true
        setLogin(true);

        // 유저 정보 세팅
        const updatedUserInfo = {userId, username, authorities}
        setUserInfo(updatedUserInfo);
        // 권한 정보 세팅
        const updatedRoles = {isUser: false, isAdmin: false}
        roleList.forEach((role) => {
            if (role === 'ROLE_USER') updatedRoles.isUser = true;
            if (role === 'ROLE_ADMIN') updatedRoles.isAdmin = true;
        })
        setRoles(updatedRoles);
    }

    // 로그아웃 세팅
    const logoutSetting = () => {
        // axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;
        // 쿠키 초기화
        Cookies.remove("accessToken")
        // 로그인 여부 : false
        setLogin(false);
        // 유저 정보 초기화
        setUserInfo(null)
        // 권한 정보 초기화
        setRoles(null)
    }

    // 로그아웃

    useEffect(() => {
        // 로그인 체크
        loginCheck() // 로그인 상태 유지
    }, []);

    return (
        <LoginContext.Provider value={{isLogin, userInfo, roles, login, loginCheck, logout}}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;