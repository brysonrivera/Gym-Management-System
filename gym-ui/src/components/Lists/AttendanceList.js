import React from 'react';
import Attendance from '../records/Attendance'

function AttendanceList({ attendances, deleteAttendance }) {
    return (
        <>
            {attendances.map((attendance, i) => <Attendance attendance={attendance} key={i} deleteAttendance={deleteAttendance} />)}

        </>
    );
}

export default AttendanceList;