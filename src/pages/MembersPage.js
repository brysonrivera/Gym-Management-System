import React from 'react';
import Nav from '../components/nav/Nav';
import MemberList from '../components/Lists/MemberList'
import {useState} from 'react';

function MembersPage() {
    const [members, setMembers] = useState([]);

    const onDelete = memberID => {
        console.log('trigger delete')
    }

    const onEdit = member => {
        console.log('trigger edit function')
    }
    return (
        <div className="main-container">
            <Nav />
            <h1>Members</h1>
            <table>
                <thead>
                    <tr>
                        <th>memberID</th>
                        <th>memberName</th>
                        <th>membershipTier</th>
                        <th>memberDOB</th>
                        <th>memberEmail</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <MemberList className="list-container" members={members} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>

        </div>
    );
}

export default MembersPage;