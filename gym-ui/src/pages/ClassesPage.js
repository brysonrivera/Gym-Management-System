import React from 'react';
import Nav from '../components/nav/Nav';
import ClassList from '../components/Lists/ClassList'
import { useState, useEffect } from 'react';

function ClassesPage() {
    const [classes, setClasses] = useState([]);

    // will be used to insert a new record to the table
    const [classDate, setClassDate] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [classType, setClassType] = useState('')
    const [employeeID, setEmployeeID] = useState('');

    //display error or added value
    const [errorMessage, setErrorMessage] = useState('');
    const [added, setAdded] = useState('');

    const loadClasses = async () => {
        const response = await fetch('/api/classes');
        const data = await response.json();
        setClasses(data);
    }

    // display Error by changing the 
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

    const deleteClass = async (e, classID) => {
        e.preventDefault();
        const response = await fetch('/api/classes', {
            method: "DELETE",
            body: JSON.stringify({ classID: classID }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status === 502) {
            displayMessage(data.sqlMessage, setErrorMessage);
        } else {
            displayMessage(data.msg, setAdded);
        }


    }

    // Function is called, and uses fetch API to post data into db
    const postClasses = async e => {
        e.preventDefault();
        let newClass = {
            classDate: classDate,
            startTime: startTime,
            classType: classType,
            employeeID: employeeID,
        }
        const response = await fetch('/api/classes', {
            method: "POST",
            body: JSON.stringify(newClass),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (response.status === 502) {
            displayMessage(data.sqlMessage, setErrorMessage);
        } else {
            displayMessage(data.msg, setAdded);
        }
    }
    useEffect(() => {
        loadClasses();
    }, []);

    return (
        <div className="main-container">
            <Nav />
            <h1>Classes</h1>
            {errorMessage &&
                <p id="error">Error: {errorMessage}</p>
            }
            {added &&
                <p id="added">{added}</p>
            }
            <table>
                <thead>
                    <tr>
                        <th>Class ID</th>
                        <th>Class Date</th>
                        <th>Start Time</th>
                        <th>Class Type</th>
                        <th>Employee ID</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <ClassList className="list-container" classes={classes} deleteClass={deleteClass} />
                </tbody>
            </table>

            <form onSubmit={e => postClasses(e)}>
                <h3>Insert New Class</h3>
                <label htmlFor='classDate'>Class Date
                    <input
                        type='date'
                        id='classDate'
                        name='classDate'
                        value={classDate}
                        required='required'
                        onChange={e => setClassDate(e.target.value)} />
                </label>
                <label htmlFor='start-time'>Start Time
                    <input
                        type='time'
                        name='start-time'
                        size='15'
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        required='required'
                    />
                </label>

                <label htmlFor='clas-type'>Class Type
                    <input
                        type='text'
                        name='amount'
                        size='15'
                        maxLength='40'
                        value={classType}
                        onChange={e => setClassType(e.target.value)}
                        required='required'
                    />
                </label>

                <label htmlFor='employeeID'>Employee ID
                    <input
                        type='number'
                        name='employeeID'
                        size='15'
                        min='1'
                        value={employeeID}
                        onChange={e => setEmployeeID(e.target.value)}
                        required='required' />
                </label>
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
}

export default ClassesPage;