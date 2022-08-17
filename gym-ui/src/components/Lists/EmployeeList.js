import React from 'react';
import Employee from '../records/Employee'

function EmployeeList({ employees, deleteEmployee }) {
    return (
        <>
            {employees.map((employee, i) => <Employee employee={employee} key={i} deleteEmployee={deleteEmployee} />)}

        </>
    );
}

export default EmployeeList;