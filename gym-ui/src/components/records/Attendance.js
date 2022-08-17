import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useState } from 'react';

function Attendance({ attendance, deleteAttendance }) {
    const [date, setDate] = useState(new Date(attendance.classDate))
    const [month, setMonth] = useState(date.getMonth() < 12 ? date.getMonth() + 1 : 1)

    return (
        <tr className="list-item">
            <td>{month}-{date.getDate()}-{date.getFullYear()}</td>
            <td>{attendance.startTime}</td>
            <td>{attendance.classType}</td>
            <td>{attendance.classID}</td>
            <td>{attendance.memberFirstName}</td>
            <td>{attendance.memberLastName}</td>
            <td>{attendance.memberID}</td>
            <td><MdDeleteOutline
                style={{ cursor: 'pointer' }}
                size="20px"
                onMouseOver={({ target }) => target.style.color = "gray"}
                onMouseOut={({ target }) => target.style.color = "black"}
                onClick={e => deleteAttendance(e, attendance.memberID, attendance.classID)} /></td>
        </tr>
    )
}
export default Attendance;