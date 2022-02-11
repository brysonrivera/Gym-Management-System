import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function GymMachine({ gymMachine, onDelete, onEdit }) {
    return (
        <tr className="list-item">
            <td>{gymMachine._id}</td>
            <td>{gymMachine.totalUsage}</td>
            <td>{gymMachine.quanity}</td>
            <td>{gymMachine.employeeID}</td>
            <td><MdEdit onClick={() => onEdit(gymMachine)} /></td>
            <td><MdDeleteOutline onClick={() => onDelete(gymMachine._id)} /></td>
        </tr>
    )
}
export default GymMachine;