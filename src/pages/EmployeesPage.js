import React from 'react';
import Nav from '../components/nav/Nav';
import EmployeeList from '../components/Lists/EmployeeList'
import {useState} from 'react';
function EmployeesPage() {
    const [employees, setEmployees] = useState([]);

    const onDelete = employeeID => {
        console.log('trigger delete')
    }

    const onEdit = employee => {
        console.log('trigger edit function')
    }

    return (
        <div className="main-container">
            <Nav />
            <h1>Employees</h1>
            <table>
                <thead>
                    <tr>
                        <th>employeeID</th>
                        <th>employeeName</th>
                        <th>employeeRole</th>
                        <th>managerID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <EmployeeList className="list-container" employees={employees} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>

        </div>
    );
}

export default EmployeesPage;