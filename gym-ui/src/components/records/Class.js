import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useState } from 'react';

function Class({ class_, deleteClass }) {
    const [date, setDate] = useState(new Date(class_.classDate))
    const [month, setMonth] = useState(date.getMonth() < 12 ? date.getMonth() + 1 : 1)
    return (
        <tr className="list-item" >
            <td>{class_.classID}</td>
            <td>{month}-{date.getDate()}-{date.getFullYear()}</td>
            <td>{class_.startTime}</td>
            <td>{class_.classType}</td>
            <td>{class_.employeeID}</td>
            <td>{class_.employeeFirstName}</td>
            <td>{class_.employeeLastName}</td>
            <td><MdDeleteOutline
                style={{ cursor: 'pointer' }}
                size="20px"
                onMouseOver={({ target }) => target.style.color = "gray"}
                onMouseOut={({ target }) => target.style.color = "black"}
                onClick={e => deleteClass(e, class_.classID)} /></td>
        </tr>
    )
}
export default Class;