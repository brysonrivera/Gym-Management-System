import React from 'react';
import Employee from '../records/Employee'

function EmployeeList({ employees, onDelete, onEdit }) {
    return (
        <>
            {employees.map((employee, i) => <Employee employees={employee} key={i} onDelete={onDelete} onEdit={onEdit} />)}

        </>
    );
}

export default EmployeeList;