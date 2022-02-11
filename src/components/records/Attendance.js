import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function Attendance({ attendance, onDelete, onEdit }) {
    return (
        <tr className="list-item">
            <td>{attendance.memberID}</td>
            <td>{attendance.classID}</td>
            <td><MdEdit onClick={() => onEdit(attendance)} /></td>
            <td><MdDeleteOutline onClick={() => onDelete(attendance._id)} /></td>
        </tr>
    )
}
export default Attendance;