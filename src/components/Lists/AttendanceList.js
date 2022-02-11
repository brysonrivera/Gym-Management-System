import React from 'react';
import Attendance from '../records/Attendance'

function AttendanceList({ attendances, onDelete, onEdit }) {
    return (
        <>
            {attendances.map((attendance, i) => <Attendance attendances={attendance} key={i} onDelete={onDelete} onEdit={onEdit} />)}

        </>
    );
}

export default AttendanceList;