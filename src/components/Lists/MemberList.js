import React from 'react';
import Member from '../records/Member'

function MemberList({ members, onDelete, onEdit }) {
    return (
        <>
            {members.map((member, i) => <Member members={member} key={i} onDelete={onDelete} onEdit={onEdit} />)}

        </>
    );
}

export default MemberList;