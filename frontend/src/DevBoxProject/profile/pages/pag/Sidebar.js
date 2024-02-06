// Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'; // 추가

import './styles.css'; // 스타일 파일을 import

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`col-md-3 ${sidebarOpen ? 'open' : ''}`} id="sidebar">
            <button onClick={toggleSidebar} className="toggle-btn">
                <FontAwesomeIcon icon={faStickyNote} />
            </button>
            <h4></h4>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                    <Link to="/about">소개</Link>
                </li>
                {/* 추가적인 사이드바 항목들을 원하는 대로 추가하세요 */}
            </ul>
        </div>
    );
};

export default Sidebar;
