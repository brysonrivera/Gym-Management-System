import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function Class({ class_, onDelete, onEdit }) {
    return (
        <tr className="list-item">
            <td>{class_._id}</td>
            <td>{class_.startTime}</td>
            <td>{class_.type}</td>
            <td>{class_.signupCounter}</td>
            <td>{class_.employeeID}</td>
            <td><MdEdit onClick={() => onEdit(class_)} /></td>
            <td><MdDeleteOutline onClick={() => onDelete(class_._id)} /></td>
        </tr>
    )
}
export default Class;