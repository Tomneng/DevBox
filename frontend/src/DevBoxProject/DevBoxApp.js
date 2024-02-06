import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import {Route, Routes, useNavigate} from 'react-router-dom';


import List from "./profile/pages/pag/List";
import WritePage from "./profile/pages/pag/WritePage";
import UpdatePage from "./profile/pages/pag/UpdatePage";
import Detail from "./profile/pages/pag/Detail";
import './profile/components/com/default.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const DevBoxApp = () => {

    // 함수로 실행하지 않으면 무한히 발생함
    // 무조건/list 로 만 간다.
    // 함수 호출시에만 가도록 하기
        const Home = () => {
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/list');
        }, [navigate]);
        // 실제 UI가 이 컴포넌트에서 렌더링되지 않으므로 null 또는 플레이스홀더를 반환합니다.
        return null;
    };
    return (

            <Container>
                <Routes>
                    <Route path='/' Component={Home}></Route>
                    <Route path="/list" Component={List}></Route> {/*  목록 */}
                    <Route path="/write" Component={WritePage}></Route> {/* 글 작성 */}
                    <Route path="/detail/:id" Component={Detail}></Route> {/* 글 상세 */}
                    <Route path="/update/:id" Component={UpdatePage}></Route> {/* 글 수정 */}
                </Routes>
            </Container>

    );
};
// Component= 재사용가능하고 독릭적인 ui
export default DevBoxApp;

