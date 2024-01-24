import React from "react";

const ShareList = () => {
  return (
    <div>
      <Container>
        <Routes>
          <Route path="/" Component={home}></Route> {/*  목록 */}
          <Route path="/list" Component={ShareList}></Route> {/*  목록 */}
          <Route path="/write" Component={}></Route> {/* 글 작성 */}
          <Route path="/detail/:id" Component={}></Route> {/* 글 상세 */}
          <Route path="/update/:id" Component={}></Route> {/* 글 수정 */}
        </Routes>
      </Container>
    </div>
  );
};

export default ShareList;
