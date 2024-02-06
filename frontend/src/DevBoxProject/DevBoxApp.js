import React from "react";
import ShareList from "./pages/share/ShareList";
import ShareWrite from "./pages/share/ShareWrite";
import ShareDetail from "./pages/share/ShareDetail";
import ShareUpdate from "./pages/share/ShareUpdate";
import {Route, Routes} from "react-router-dom";

import "./components/default.css"
import HomePage from "./pages/Utils/HomePage";
import RegisterPage from "./pages/Utils/RegisterPage";
import LoginPage from "./pages/Utils/LoginPage";
import MyPage from "./pages/Utils/MyPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import ErrorLibPage from "./pages/errorLib/ErrorLibPage";
import LoginContextProvider from "./contexts/LoginContextProvider";
import UpdatePage from "./profile/pages/pag/UpdatePage";
import WritePage from "./profile/pages/pag/WritePage";
import Detail from "./profile/pages/pag/Detail";
import List from "./profile/pages/pag/List";

const DevBoxApp = () => {
		return (
				<>
						<LoginContextProvider>
								<Routes>
										<Route path='/' Component={HomePage}></Route>
										<Route path='/register' Component={RegisterPage}></Route>
										<Route path='/login' Component={LoginPage}></Route>
										<Route path='/mypage' Component={MyPage}></Route>
										<Route path='/about' Component={AboutPage}></Route>
										<Route path='/admin' Component={AdminPage}></Route>
										<Route path='/errorLib' Component={ErrorLibPage}></Route>

										{/* lib */}

										{/* Share  */}
										<Route path="/codeshare" Component={ShareList}></Route>{/*  Share 목록 */}
										<Route path="/codeshare/write" Component={ShareWrite}></Route>{/* Share 작성 */}
										<Route path="/codeshare/detail/:sid" Component={ShareDetail}></Route>{/* Share 상세 */}
										<Route path="/codeshare/update/:sid" Component={ShareUpdate}></Route>{/* Share 수정 */}

										{/* profile */}
									<Route path="/profile/list" Component={List}></Route>{/*  Share 목록 */}
									<Route path="/profile/write" Component={WritePage}></Route>{/* Share 작성 */}
									<Route path="/profile/detail/:id" Component={Detail}></Route>{/* Share 상세 */}
									<Route path="/profile/update/:id" Component={UpdatePage}></Route>{/* Share 수정 */}

								</Routes>
						</LoginContextProvider>
				</>
		);
};

export default DevBoxApp;
