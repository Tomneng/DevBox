import React, {useState, useRef, useEffect, useContext} from 'react';
import Header from "../../../components/Header";
import '../CSS/MyDocWirte.css';
import * as auth from "../../../apis/auth"
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {LoginContext} from "../../../contexts/LoginContextProvider";

const MyDocUpdate = () => {
    const [inputs, setInputs] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');
    const textareaRef = useRef(null);
    const myDocContainerRef = useRef(null);
    const [myDoc, setMyDoc] = useState({});

    const navigate = useNavigate();

    const {userInfo} = useContext(LoginContext);

    useEffect(() => {
        let response;

    })

    useEffect(() => {
        // textarea의 내용이 변경될 때마다 높이 조절
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        adjustMyDocContainerHeight();

        setMyDoc({
            ...myDoc,
            userId: userInfo.id
        })
    }, [inputs]);

    const adjustMyDocContainerHeight = () => {
        if (myDocContainerRef.current) {
            const totalTagsHeight = Array.from(myDocContainerRef.current.children)
                .reduce((totalHeight, tag) => totalHeight + tag.offsetHeight, 0) + document.getElementById("bottomLine").offsetHeight;
            myDocContainerRef.current.style.height = `${totalTagsHeight}px`;
        }
    };

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
            case 'code':
                addCodeBlock();
                break;
            default:
                break;
        }
    };

    const addH2 = (type, placeholder, style) => {
        setInputs((prevInputs) => [...prevInputs, {type, placeholder, style}]);
    };
    const addP = (type, placeholder, style) => {
        setInputs((prevInputs) => [...prevInputs, {type, placeholder, style}]);
    };
    const addCodeBlock = () => {
        setInputs((prevInputs) => [...prevInputs, {type: 'textarea', placeholder: '코드블록', style: 'code-style'}]);
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

    const handleChange = (e) => {
        setMyDoc({
            ...myDoc,
            [e.target.name]: e.target.value
        });
    }

    const writeMyDoc = async (e) => {
        e.preventDefault();
        let response
        let data;
        response = await auth.writeMyDoc(myDoc)
        data = response.data;
        if (response.status === 201) {
            alert("작성완료!")
            navigate(`/myDoc/detail/${data.docId}`)
        } else {
            alert("작성 실패!")
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
                    <Header/>
                    <hr/>
                    <div id="tagSelect">
                        <select id="tagDropdown" value={selectedTag} onChange={handleTagChange}>
                            <option value="">태그를 선택하세요</option>
                            <option value="h2">Heading 1</option>
                            <option value="p">Paragraph</option>
                            <option value="code">Code Block</option>
                        </select>
                        <button onClick={handleAddTag} className="custom-btn button-grayBlack"><span>추가</span></button>
                    </div>
                </div>
                <div className="myDoccontainer" ref={myDocContainerRef}>
                    <form onSubmit={(e) => writeMyDoc(e)}>
                        <input name="title" placeholder="제목" className="title" onChange={(e) => handleChange(e)}/>
                        <hr/>
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
                                    <FontAwesomeIcon icon={faTrashCan}/>
                                </button>
                            </div>
                        ))}
                        <div id="bottomLine">
                            <select id="langSelect" name="lang" onChange={(e) => handleChange(e)}>
                                <option value="">언어 혹은 프레임워크를 선택하세요</option>
                                <option value="Hibernate">Hibernate (Java)</option>
                                <option value="Sequelize">Sequelize (Node.js - JavaScript)</option>
                                <option value="SQLAlchemy">SQLAlchemy (Python)</option>
                                <option value="EntityFramework">Entity Framework (C#)</option>
                                <option value="DjangoORM">Django ORM (Python - Django 프레임워크 내장)</option>
                                <option value="ActiveRecord">ActiveRecord (Ruby on Rails - Ruby)</option>
                                <option value="SpringDataJPA">Spring Data JPA (Java - Spring Framework 내장)</option>
                                <option value="Doctrine">Doctrine (PHP - Symfony 프레임워크 내장)</option>
                                <option value="Peewee">Peewee (Python)</option>
                                <option value="Eloquent">Eloquent (PHP - Laravel 프레임워크 내장)</option>
                                <option value="MySQL">MySQL</option>
                                <option value="PostgreSQL">PostgreSQL</option>
                                <option value="MicrosoftSQLServer">Microsoft SQL Server</option>
                                <option value="OracleDatabase">Oracle Database</option>
                                <option value="SQLite">SQLite</option>
                                <option value="MongoDB">MongoDB (NoSQL)</option>
                                <option value="Redis">Redis (In-memory 데이터 스토어)</option>
                                <option value="Cassandra">Cassandra (분산형 NoSQL 데이터베이스)</option>
                                <option value="MariaDB">MariaDB</option>
                                <option value="CouchDB">CouchDB (NoSQL)</option>
                                <option value="React">React (JavaScript 라이브러리)</option>
                                <option value="Angular">Angular</option>
                                <option value="Vue.js">Vue.js</option>
                                <option value="Django">Django (Python)</option>
                                <option value="Flask">Flask (Python)</option>
                                <option value="SpringBoot">Spring Boot (Java)</option>
                                <option value="Express.js">Express.js (JavaScript)</option>
                                <option value="RubyonRails">Ruby on Rails (Ruby)</option>
                                <option value="Laravel">Laravel (PHP)</option>
                                <option value="Flask2">Flask (Python)</option>
                                <option value="Flutter">Flutter (Dart 기반)</option>
                                <option value="Xamarin">Xamarin (C# 기반)</option>
                                <option value="Meteor">Meteor (JavaScript)</option>
                                <option value="Ember.js">Ember.js (JavaScript)</option>
                                <option value="Backbone.js">Backbone.js (JavaScript)</option>
                                <option value="PlayFramework">Play Framework (Scala/Java)</option>
                                <option value="Struts">Struts (Java)</option>
                                <option value="Cherrypy">Cherrypy (Python)</option>
                                <option value="Sails.js">Sails.js (JavaScript)</option>
                                <option value="Symphony">Symphony (PHP)</option>
                                <option value="Python">Python</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Java">Java</option>
                                <option value="C#">C#</option>
                                <option value="TypeScript">TypeScript</option>
                                <option value="PHP">PHP</option>
                                <option value="C++">C++</option>
                                <option value="Ruby">Ruby</option>
                                <option value="Swift">Swift</option>
                                <option value="Go">Go</option>
                                <option value="Kotlin">Kotlin</option>
                                <option value="Rust">Rust</option>
                                <option value="Scala">Scala</option>
                                <option value="Objective-C">Objective-C</option>
                                <option value="Dart">Dart</option>
                                <option value="MATLAB">MATLAB</option>
                                <option value="R">R</option>
                                <option value="ShellScripting">Shell Scripting (Bash)</option>
                                <option value="Groovy">Groovy</option>
                                <option value="Perl">Perl</option>
                            </select>
                            <button type="submit" id="submitButton" className="custom-btn button-grayBlack"><span>저장</span></button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};


export default MyDocUpdate;
