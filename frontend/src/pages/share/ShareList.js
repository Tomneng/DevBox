import React from "react";
import ShareWrite from "./ShareWrite";
import ShareDetail from "./ShareDetail";
import ShareUpdate from "./ShareUpdate";
import {Container, Form} from "react-bootstrap";

const ShareList = () => {

    const changeValue = () => {

    };

    return (
        <Container>
            <h2>Share</h2>
            <hr/>
        <Form.Group>
            <Form.Label>제목 : </Form.Label>
            <Form.Control
            type={"text"}
            placeholder={"제목 입력"}
            onChange={changeValue}
            name={"stitle"}
            required/>


        </Form.Group>

        </Container>
    );
};

export default ShareList;
