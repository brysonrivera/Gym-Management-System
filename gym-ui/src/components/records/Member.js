import React from 'react';
import { useState } from 'react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';

function Member({ member, deleteMember }) {

    const [dob, setDOB] = useState(new Date(member.memberDOB))

    return (
        <tr className="list-item">
            <td>{member.memberID}</td>
            <td>{member.memberFirstName}</td>
            <td>{member.memberLastName}</td>
            <td>{member.membershipTier}</td>
            <td>{dob.getMonth()}-{dob.getDate()}-{dob.getFullYear()}</td>
            <td>{member.phoneNumber}</td>
            <td className='email'>{member.memberEmail}</td>
            <td><MdDeleteOutline
                style={{ cursor: 'pointer' }}
                size="20px"
                onMouseOver={({ target }) => target.style.color = "gray"}
                onMouseOut={({ target }) => target.style.color = "black"}
                onClick={e => deleteMember(e, member.memberID)} /></td>
        </tr>
    )
}
export default Member;