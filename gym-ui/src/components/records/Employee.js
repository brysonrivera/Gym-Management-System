import React from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function Employee({ employee, deleteEmployee }) {
    return (
        <tr className="list-item">
            <td>{employee.employeeID}</td>
            <td>{employee.employeeFirstName}</td>
            <td>{employee.employeeLastName}</td>
            <td>{employee.managerID ? employee.managerID : 'NULL'}</td>
            <td>{employee.employeeRole}</td>
            <td><MdDeleteOutline
                style={{ cursor: 'pointer' }}
                size="20px"
                onMouseOver={({ target }) => target.style.color = "gray"}
                onMouseOut={({ target }) => target.style.color = "black"}
                onClick={e => deleteEmployee(e, employee.employeeID)} /></td>
        </tr>
    )
}
export default Employee;