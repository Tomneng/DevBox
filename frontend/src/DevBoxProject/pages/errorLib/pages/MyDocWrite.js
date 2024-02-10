import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../components/Header";
import '../CSS/MyDocWirte.css';
import * as auth from "../../../apis/auth"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const MyDocWrite = () => {
    const [inputs, setInputs] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const textareaRef = useRef(null);
    const [myDoc, setMyDoc] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        // textarea의 내용이 변경될 때마다 높이 조절
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputs]);

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const handleAddTag = () => {
        switch (selectedTag) {
            case 'h2':
                addH2('textarea', '제목', 'h2-style');
                break;
            case 'p':
                addP('textarea', '문단', 'p-style');
                break;
            case 'img':
                // Implement image adding logic here
                break;
            case 'code':
                addCodeBlock();
                break;
            default:
                break;
        }
    };

    const addH2 = (type, placeholder, style) => {
        setInputs((prevInputs) => [...prevInputs, { type, placeholder, style }]);
    };
    const addP = (type, placeholder, style) => {
        setInputs((prevInputs) => [...prevInputs, { type, placeholder, style }]);
    };
    const addCodeBlock = () => {
        setInputs((prevInputs) => [...prevInputs, { type: 'textarea', placeholder: '코드블록', style: 'code-style' }]);
    };

    const handleInputChange = (e, index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].value = value;
        setInputs(updatedInputs);
        setMyDoc({
            ...myDoc,
            [e.target.name]: e.target.value
        });
        console.log(myDoc)
    };

    const writeMyDoc = async (e) => {
        e.preventDefault();
        let response
        let data;
        response = await auth.writeMyDoc(myDoc)
        data = response.data;
        if (response.status === 201){
            alert("작성완료!")
            navigate(`/myDoc/detail/1`)
        }
    }

    const handleDeleteTag = (index) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };


    return (
        <>
            <div className="fullPage2">
                <div className="write-header">
                    <hr/>
                    <div id="tagSelect">
                        <label htmlFor="tagDropdown">태그 선택:</label>
                        <select id="tagDropdown" value={selectedTag} onChange={handleTagChange}>
                            <option value="">태그를 선택하세요</option>
                            <option value="h2">Heading 1</option>
                            <option value="p">Paragraph</option>
                            <option value="img">Image</option>
                            <option value="code">Code Block</option>
                        </select>
                        <button onClick={handleAddTag}>추가</button>
                    </div>
                </div>
                <div className="myDoccontainer">
                    <form onSubmit={(e) => writeMyDoc(e)}>
                        {/* ... (다른 입력 필드들) */}
                        {inputs.map((input, index) => (
                            <div key={index} className="tagContainer">
                            <textarea
                                placeholder={input.placeholder}
                                value={input.value || ''}
                                onChange={(e) => handleInputChange(e, index, e.target.value)}
                                className={input.style}
                                ref={textareaRef}
                                name={`${input.placeholder}${index}`}
                            />
                                <button type="button" className="deleteButton" onClick={() => handleDeleteTag(index)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                        ))}
                        <button type="submit">저장</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MyDocWrite;
