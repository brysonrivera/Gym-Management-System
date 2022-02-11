import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function Employee({ employee, onDelete, onEdit }) {
    return (
        <tr className="list-item">
            <td>{employee._id}</td>
            <td>{employee.name}</td>
            <td>{employee.role}</td>
            <td>{employee.managerID}</td>
            <td><MdEdit onClick={() => onEdit(employee)} /></td>
            <td><MdDeleteOutline onClick={() => onDelete(employee._id)} /></td>
        </tr>
    )
}
export default Employee;