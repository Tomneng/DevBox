import React, {useEffect, useRef, useState} from 'react';
import Header from "../../../components/Header";
import * as auth from "../../../apis/auth"
import {useNavigate, useParams} from "react-router-dom";
import "../CSS/MyDocDetail.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {alert} from "../../../apis/alert";

const MyDocDetail = () => {

    const [myDoc, setMyDoc] = useState({
        docId : "",
        title : "",
        lang : "",
        content: "",
        createdAt: "",
        viewCnt: "",
    });
    const [contents, setContents] = useState([]);
    const navigate = useNavigate();

    const id = useParams();
    let hTagexp = /제목/;
    let pTagexp = /문단/;
    let codeTagexp = /코드블록/;
    let response;
    const initgetDoc = async () => {
        try {
            const response = await auth.getmyDoc(id.did);
            setMyDoc(response.data);
            const contentsArray = response.data.content.split("replaceThisDevBox");
            setContents(contentsArray);
            console.log()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        initgetDoc();
    }, []);

    const DeleteMyDoc = () => {
        window.confirm("삭제 하시겠습니까?")
        let deleteResponse = auth.deleteMyDoc(myDoc.docId)
        if(deleteResponse.status === 200){
            alert("삭제 성공")
            navigate("/myDoc/list")
        }else{
            alert("삭제 실패")
        }
    }

    return (
        <>
            <div className="fullPage">
                <Header/>
                <div className="myDoccontainerdetail" >
                    <h1>{myDoc.title}</h1>
                    <hr/>
                    {
                        contents.map((content, index) => {
                            if (index % 2 === 0) {
                                let nextContent = contents[index + 1]; // 다음 인덱스의 원소
                                if (content.search(hTagexp) !== -1) {
                                    return (
                                        <div key={index}>
                                            {nextContent && <h2>{nextContent}</h2>}
                                        </div>
                                    );
                                } else if (content.search(pTagexp) !== -1) {
                                    return (
                                        <div key={index}>
                                            {nextContent && <p>{nextContent}</p>}
                                        </div>
                                    );
                                } else if (content.search(codeTagexp) !== -1) {
                                    return (
                                        <div key={index}>
                    <pre>
                        {nextContent && <code>{nextContent}</code>}
                    </pre>

                                        </div>
                                    );
                                }
                            }
                            return null;
                        })
                    }
                    <button type="button" className="deleteButton button-grayBlack custom-btn" onClick={() => DeleteMyDoc()}>
                        <span><FontAwesomeIcon icon={faTrashCan}/></span>
                    </button>
                </div>
            </div>

        </>
    );
};

export default MyDocDetail;