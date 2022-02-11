import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function Member({ member, onDelete, onEdit }) {
    return (
        <tr className="list-item">
            <td>{member._id}</td>
            <td>{member.name}</td>
            <td>{member.tier}</td>
            <td>{member.DOB}</td>
            <td>{member.phoneNumber}</td>
            <td>{member.email}</td>
            <td><MdEdit onClick={() => onEdit(member)} /></td>
            <td><MdDeleteOutline onClick={() => onDelete(member._id)} /></td>
        </tr>
    )
}
export default Member;