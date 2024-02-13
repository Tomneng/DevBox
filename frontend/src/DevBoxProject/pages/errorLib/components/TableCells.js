import React from 'react';
import {Link} from "react-router-dom";

const TableCells = (props) => {

    const {docId, lang, title, createdAt, viewCnt} = props.myDoc;

    return (
        <div className="table-row">
            <div className="table-cell">{docId}</div>
            <div className="table-cell">{lang}</div>
            <div className="table-cell"><Link to={"/myLib/detail/" + docId}>{title}</Link></div>
            <div className="table-cell">{createdAt}</div>
            <div className="table-cell">{viewCnt}</div>
        </div>
    );
};

export default TableCells;