import React from 'react';
import {Link} from "react-router-dom";

const TableCells = (props) => {

    const {id, lang, subject, createdAt, viewCnt} = props.myDoc;

    return (
        <div className="table-row">
            <div className="table-cell">{id}</div>
            <div className="table-cell">{lang}</div>
            <div className="table-cell"><Link to={"/myLib/detail/" + id}>{subject}</Link></div>
            <div className="table-cell">{createdAt}</div>
            <div className="table-cell">{viewCnt}</div>
        </div>
    );
};

export default TableCells;