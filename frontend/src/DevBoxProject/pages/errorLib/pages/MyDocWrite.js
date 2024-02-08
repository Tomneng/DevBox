import React, { useState, useRef, useEffect } from 'react';
import Header from "../../../components/Header";
import '../CSS/MyDocWirte.css';

const MyDocWrite = () => {
    const [inputs, setInputs] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const textareaRef = useRef(null);

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
                addH2('textarea', '새로운 제목', 'h2-style');
                break;
            case 'p':
                addP('textarea', '새로운 문단', 'p-style');
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

    const handleInputChange = (index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].value = value;
        setInputs(updatedInputs);
    };

    const addCodeBlock = () => {
        setInputs((prevInputs) => [...prevInputs, { type: 'textarea', placeholder: '새로운 코드 블록', style: 'code-style' }]);
    };

    return (
        <>
            <div className="fullPage2">
                <div className="write-header">
                    <hr />
                    <div id="tagSelect">
                        <label htmlFor="tagDropdown">태그 선택:</label>
                        <select id="tagDropdown" value={selectedTag} onChange={handleTagChange}>
                            <option value="h2">Heading 1</option>
                            <option value="p">Paragraph</option>
                            <option value="img">Image</option>
                            <option value="code">Code Block</option>
                        </select>
                        <button onClick={handleAddTag}>추가</button>
                    </div>
                </div>
                <div className="myDoccontainer">
                    <form>
                        <input className="title" placeholder="제목을 입력해주세요..." />
                        <hr />
                        {inputs.map((input, index) => (
                            input.type === 'textarea' ? (
                                <textarea
                                    key={index}
                                    placeholder={input.placeholder}
                                    value={input.value || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className={input.style}
                                    ref={textareaRef}
                                />
                            ) : (
                                <input
                                    key={index}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    value={input.value || ''}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className={input.style}
                                />
                            )
                        ))}
                    </form>
                </div>
            </div>
        </>
    );
};

export default MyDocWrite;
