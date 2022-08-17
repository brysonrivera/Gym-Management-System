import React from 'react';
import Nav from '../components/nav/Nav';
import AttendanceList from '../components/Lists/AttendanceList'
import { useState, useEffect } from 'react';

function AttendancePage() {
    const [attendances, setAttendance] = useState([]);

    const [typesArr, setTypesArr] = useState([]);
    const [classDateArr, setClassDateArr] = useState([]);
    const [classStartArr, setClassStartArr] = useState([]);
    const [employeeNames, setEmployeeNames] = useState([]);

    const [customerPhone, setCustomerPhone] = useState('');
    const [classType, setClassType] = useState('');
    const [classDate, setClassDate] = useState('');
    const [classStart, setClassStart] = useState('');
    const [employeeFullName, setEmployeeFullName] = useState('')


    //display error or added value
    const [errorMessage, setErrorMessage] = useState('');
    const [added, setAdded] = useState('');

    const loadAttendance = async () => {
        const response = await fetch('/api/attendance');
        const data = await response.json();
        setAttendance(data);
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

    const deleteAttendance = async (e, memberID, classID) => {
        e.preventDefault();
        console.log(`{ memberID: ${memberID}, classID: ${classID}`)
        let attendanceKey = { memberID: memberID, classID: classID }
        const response = await fetch('/api/attendance', {
            method: "DELETE",
            body: JSON.stringify(attendanceKey),
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

    const postAttendance = async e => {
        e.preventDefault();
        const name = employeeFullName.split(" ");
        const firstName = name[0]
        const lastName = name[1]
        const dateObj = new Date(classDate)
        let date = `${dateObj.getFullYear()}-${dateObj.getMonth() < 12 ? dateObj.getMonth() + 1 : 1}-${dateObj.getDate()}`

        let newAttendance = {
            customerPhone: customerPhone,
            classType: classType,
            classDate: date,
            classStart: classStart,
            firstName: firstName,
            lastName: lastName
        }
        const response = await fetch('/api/attendance', {
            method: "POST",
            body: JSON.stringify(newAttendance),
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

    const populateClassTypes = async () => {
        try {
            const response = await fetch('/api/attendance/class-type');
            const data = await response.json();
            if (response.status === 502) {
                displayMessage(data.sqlMessage, setErrorMessage);
            } else {
                setTypesArr(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const populateClassDates = async () => {
        try {
            if (!classType) return
            const response = await fetch(`/api/attendance/class-dates?classTypes=${classType}`);
            const data = await response.json();
            if (response.status === 502) {
                displayMessage(data.sqlMessage, setErrorMessage);
            } else {
                setClassDateArr(data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const populateStartTimes = async () => {
        try {
            if (!classType && !classDate) return
            console.log(`/api/attendance/class-start?classType=${classType}&classDate=${classDate}`)
            const response = await fetch(`/api/attendance/class-start?classType=${classType}&classDate=${classDate}`);
            const data = await response.json();
            if (response.status === 502) {
                displayMessage(data.sqlMessage, setErrorMessage);
            } else {
                setClassStartArr(data)
            }

        } catch (error) {
            console.error(error)

        }
    }

    const populateEmployeeNames = async () => {
        try {
            if (!classType && !classDate && !classStart) return

            const dateObj = new Date(classDate)
            let date = `${dateObj.getFullYear()}-${dateObj.getMonth() < 12 ? dateObj.getMonth() + 1 : 1}-${dateObj.getDate()}`

            const url = `/api/attendance/employees?classType=${classType}&classDate=${date}&classStart=${classStart}`
            console.log(url)
            const response = await fetch(url);
            const data = await response.json();
            if (response.status === 502) {
                displayMessage(data.sqlMessage, setErrorMessage);
            } else {
                setEmployeeNames(data)
            }

        } catch (error) {
            console.error(error)

        }
    }

    useEffect(() => {
        loadAttendance();
        populateClassTypes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        populateClassDates();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classType])

    useEffect(() => {
        populateStartTimes();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classType, classDate])

    useEffect(() => {
        populateEmployeeNames();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classStart])

    return (
        <div className="main-container">
            <Nav />
            <h1>Class Attendance</h1>
            {errorMessage &&
                <p id="error">Error: {errorMessage}</p>
            }
            {added &&
                <p id="added">{added}</p>
            }
            <table>
                <thead>
                    <tr>
                        <th>Class Date</th>
                        <th>Start Time</th>
                        <th>Class Type</th>
                        <th>Class ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>member ID</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <AttendanceList className="list-container" attendances={attendances} deleteAttendance={deleteAttendance} />
                </tbody>
            </table>
            <form onSubmit={e => postAttendance(e)}>
                <h3>Insert Customer Phone Number and Class Type.</h3>
                <label htmlFor="customerPhone">Member Phone Number
                    <input
                        id="customerPhone"
                        type="text"
                        pattern="\d{3}-\d{3}-\d{4}"
                        name="customerPhone"
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        required="required" />
                    Ex: ###-###-####
                </label>
                <br />
                {!!typesArr.length &&
                    <label htmlFor="class-type">Select a Class Type:
                        <select value={classType} onChange={e => setClassType(e.target.value)} name="class-type" id="class-type">
                            <option value='' disable='true'>Select Your Class</option>
                            {typesArr.map((type, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={type.classType}
                                    >{type.classType}</option>
                                )
                            })}
                        </select>
                    </label>
                }
                <br />
                {!!classDateArr.length &&
                    <label htmlFor="class-dates">Class Dates
                        <select value={classDate} onChange={e => setClassDate(e.target.value)} name="class-dates" id="class-dates">
                            <option value='' disable='true' >Pick your Class Date</option>
                            {classDateArr.map((date, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={date.classDate}
                                    >{new Date(date.classDate).getMonth() < 12 ? new Date(date.classDate).getMonth() + 1 : 1}
                                        -{new Date(date.classDate).getDate()}
                                        -{new Date(date.classDate).getFullYear()}</option>
                                )
                            })}
                        </select>
                    </label>
                }
                {!!classStartArr.length &&
                    <label htmlFor="class-start">Class Start Times:
                        <select value={classStart} onChange={e => setClassStart(e.target.value)} name="class-start" id="class-start">
                            <option value='' disable='true'>Select Start Time: </option>
                            {classStartArr.map((start, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={start.startTime}

                                    >{start.niceFormat}</option>
                                )
                            })}
                        </select>
                    </label>
                }
                {!!employeeNames.length &&
                    <label htmlFor="class-employees">Class Start Times:
                        <select value={employeeFullName} onChange={e => setEmployeeFullName(e.target.value)} name="class-employees" id="class-employees">
                            <option value='' disable='true'>Select Instructor: </option>
                            {employeeNames.map((employee, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={`${employee.firstName} ${employee.lastName}`}
                                    >{employee.firstName} {employee.lastName}</option>
                                )
                            })}
                        </select>
                    </label>
                }
                <button type="submit">Confirm</button>
            </form>

        </div>
    );
}

export default AttendancePage;