import React from 'react';
import Nav from '../components/nav/Nav';
import EmployeeList from '../components/Lists/EmployeeList'
import { useState, useEffect } from 'react';
function EmployeesPage() {
    const [employees, setEmployees] = useState([]);

    const [employeeFirstName, setEmployeeFirstName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [managerID, setManagerID] = useState('');
    const [employeeRole, setEmployeeRole] = useState('');

    //error value
    const [errorMessage, setErrorMessage] = useState('');

    const [added, setAdded] = useState('');


    const loadEmployees = async () => {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
    }
    //display Error by changing the 
    const displayMessage = async (message, setFunction) => {
        const reload = () => {
            window.location.reload();
        }
        setFunction(message);
        //when 10 seconds pass, the error message will go away
        setTimeout(() => {
            setFunction('')
            reload()
        }, 5000);
    }

    const deleteEmployee = async (e, employeeID) => {
        e.preventDefault();
        const response = await fetch('/api/employees', {
            method: "DELETE",
            body: JSON.stringify({ employeeID: employeeID }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status === 201) {
            displayMessage(data.msg, setAdded);
        } else {
            displayMessage(data.sqlMessage, setErrorMessage);
        }

    }
    const postEmployee = async e => {
        e.preventDefault();
        let updatedManagerID = managerID
        if (managerID === "") {
            updatedManagerID = null
        }
        let newEmployee = {
            employeeFirstName: employeeFirstName,
            employeeLastName: employeeLastName,
            managerID: updatedManagerID,
            employeeRole: employeeRole,
        }
        const response = await fetch('/api/employees', {
            method: "POST",
            body: JSON.stringify(newEmployee),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status === 201) {
            displayMessage(data.msg, setAdded);
        } else {
            displayMessage(data.sqlMessage, setErrorMessage);
        }
    }

    useEffect(() => {
        loadEmployees();
    }, []);

    return (
        <div className="main-container">
            <Nav />
            <h1>Employees</h1>
            {errorMessage &&
                <p id="error">Error: {errorMessage}</p>
            }
            {added &&
                <p id="added">{added}</p>
            }
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Manager ID</th>
                        <th>Employee Role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <EmployeeList className="list-container" deleteEmployee={deleteEmployee} employees={employees} />
                </tbody>
            </table>
            <form onSubmit={e => postEmployee(e)}>
                <h3>Insert New Employee</h3>
                <label htmlFor='name'>First Name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        size='15'
                        maxLength='40'
                        value={employeeFirstName}
                        onChange={e => setEmployeeFirstName(e.target.value)}
                        required='required'
                    />
                </label>
                <label htmlFor='name'>Last Name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        size='15'
                        maxLength='40'
                        value={employeeLastName}
                        onChange={e => setEmployeeLastName(e.target.value)}
                        required='required'
                    />
                </label>
                <label htmlFor='managerID'>Manager ID (if applicable)
                    <input
                        type='number'
                        id='managerID'
                        name='managerID'
                        size='15'
                        value={managerID}
                        onChange={e => setManagerID(e.target.value)}
                    />
                </label>
                <label htmlFor='role'>Employee Role
                    <input
                        type='text'
                        id='role'
                        name='role'
                        size='15'
                        maxLength='40'
                        value={employeeRole}
                        onChange={e => setEmployeeRole(e.target.value)}
                        required='required' />
                </label>

                <button type="submit">Confirm</button>
            </form>
            <form action='/employee-select' method='GET'>
                <fieldset>
                    <legend>Filter</legend>
                    <input type="radio" id="manager"
                        name="role" value="manager" />
                    <label htmlFor='manager'>Manager</label>

                    <input type="radio" id="non-manager"
                        name="role" value="non-manager" />
                    <label htmlFor="non-manager">Non-Manager</label>
                    <div>
                        <button type="submit">Confirm</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default EmployeesPage;