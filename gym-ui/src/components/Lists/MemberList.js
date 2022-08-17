import React from 'react';
import Member from '../records/Member'

function MemberList({ members, deleteMember }) {
    return (
        <>
            {members.map((member, i) => <Member member={member} key={i} deleteMember={deleteMember} />)}

        </>
    );
}

export default MemberList;