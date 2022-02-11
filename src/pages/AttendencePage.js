import React from 'react';
import Nav from '../components/nav/Nav';
import AttendanceList from '../components/Lists/AttendanceList'
import { useState } from 'react';

function AttendancePage() {
    const [attendances, setAttendance] = useState([]);

    const onDelete = attendanceID => {
        console.log('trigger delete')
    }

    const onEdit = atttendance => {
        console.log('trigger edit function')
    }
    return (
        <div className="main-container">
            <Nav />
            <h1>Attendance</h1>
            <table>
                <thead>
                    <tr>
                        <th>memberID</th>
                        <th>classID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <AttendanceList className="list-container" attendances={attendances} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>

            <form>
                <label for="memberid">Member ID:
                    <input type="number" id="memberid" name="memberid " />
                </label>

                <label for="classid">Class ID:
                    <input type="number" id="classid" name="classid " />
                </label>

            </form>

        </div>
    );
}

export default AttendancePage;