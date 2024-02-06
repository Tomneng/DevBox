import React from 'react';

const ListItem = (props) => {
    const { id, name, createdAt } = props.profile;

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>
                <a href={`/detail/${id}`}>{name}</a>
            </td>
            <td>
                {new Date(createdAt).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'Asia/Seoul',
                })}
            </td>
        </tr>
    );
};

export default ListItem;
