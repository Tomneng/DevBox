import React from "react";
import ShareList from "../pages/share/ShareList";
import ShareWrite from "../pages/share/ShareWrite";
import ShareDetail from "../pages/share/ShareDetail";
import ShareUpdate from "../pages/share/ShareUpdate";
import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";

const DevBoxApp = () => {
  return (
    <div>
      <Container>
        <Routes>

          {/* Error */}

        
          {/* Share  */}
          <Route path="/list" Component={ShareList}></Route>{/*  Share 목록 */}
          <Route path="/write" Component={ShareWrite}></Route>{/* Share 작성 */}
          <Route path="/detail/:sid" Component={ShareDetail}></Route>{/* Share 상세 */}
          <Route path="/update/:sid" Component={ShareUpdate}></Route>{/* Share 수정 */}



          {/* profile */}


        </Routes>
      </Container>
    </div>
  );
};

export default DevBoxApp;
