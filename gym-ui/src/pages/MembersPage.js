import React from 'react';
import Nav from '../components/nav/Nav';
import MemberList from '../components/Lists/MemberList';
import { useState, useEffect } from 'react';

function MembersPage() {
    // each record for the table
    const [members, setMembers] = useState([]);

    // will be used to insert a new record to the table
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [tier, setTier] = useState('Bronze');
    const [dob, setDOB] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    //error value
    const [errorMessage, setErrorMessage] = useState('');

    const [added, setAdded] = useState('');

    //gets all records and useMembers to set the value of members. 
    const loadMembers = async () => {
        const response = await fetch('/api/members');
        const data = await response.json();
        setMembers(data);
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

    const deleteMember = async (e, memberID) => {
        e.preventDefault();
        const response = await fetch('/api/members', {
            method: "DELETE",
            body: JSON.stringify({ memberID: memberID }),
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

    const postMember = async e => {
        e.preventDefault();
        let newMember = {
            fname: fname,
            lname: lname,
            tier: tier,
            dob: dob,
            phoneNumber: phoneNumber,
            email: email
        }
        const response = await fetch('/api/members', {
            method: "POST",
            body: JSON.stringify(newMember),
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
        loadMembers();
    }, []);

    return (
        <div className="main-container">
            <Nav />
            <h1>Members</h1>
            {errorMessage &&
                <p id="error">Error: {errorMessage}</p>
            }
            {added &&
                <p id="added">{added}</p>
            }
            <table>
                <thead>
                    <tr>
                        <th>member ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Member Tier</th>
                        <th>DOB</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <MemberList className="list-container" members={members} deleteMember={deleteMember} />
                </tbody>
            </table>

            <form onSubmit={e => postMember(e)}>
                <h3>Insert New Member</h3>
                <label htmlFor='fname'>First Name
                    <input
                        type='text'
                        id='fname'
                        name='fname'
                        size='15'
                        maxLength='40'
                        value={fname}
                        required='required'
                        onChange={e => setFName(e.target.value)} />
                </label>
                <label htmlFor='lname'>Last Name
                    <input
                        type='text'
                        id='lname'
                        name='lname'
                        size='15'
                        value={lname}
                        maxLength='40'
                        required='required'
                        onChange={e => setLName(e.target.value)} />
                </label>
                <label htmlFor='tier'>Tier
                    <select
                        id='tier'
                        name='tier'
                        onChange={e => setTier(e.target.value)}
                    >
                        <option value="Bronze">Bronze</option>

                        <option value="Silver"> Silver</option>

                        <option value="Gold">Gold</option>

                        <option value="Platinum">Platinum</option>
                    </select>
                </label>
                <label htmlFor='dob'>DOB
                    <input
                        type='date'
                        id='dob'
                        name='dob'
                        value={dob}
                        required='required'
                        onChange={e => setDOB(e.target.value)} />
                </label>
                <label htmlFor='phone'>Phone Number (XXX-XXX-XXXX)
                    <input
                        type='tel'
                        id='phone'
                        name='phone'
                        size='15'
                        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                        value={phoneNumber}
                        required='required'
                        onChange={e => setPhoneNumber(e.target.value)} />
                </label>
                <label htmlFor='email'>Email
                    <input
                        type='text'
                        id='email'
                        name='email'
                        size='15'
                        value={email}
                        maxLength='40'
                        required='required'
                        onChange={e => setEmail(e.target.value)} />
                </label>
                <button type="submit">Confirm</button>
            </form>


            <form action='/member-select' method='GET'>
                <fieldset>
                    <legend>Filter by Membership Tier</legend>
                    <input type="radio" id="bronze"
                        name="tier" value="bronze" />
                    <label htmlFor='bronze'>Bronze</label>

                    <input type="radio" id="silver"
                        name="tier" value="silver" />
                    <label htmlFor="silver">Silver</label>

                    <input type="radio" id="gold"
                        name="tier" value="gold" />
                    <label htmlFor="gold">Gold</label>

                    <input type="radio" id="platinum"
                        name="tier" value="platinum" />
                    <label htmlFor="platinum">Platinum</label>
                    <div>
                        <button type="submit">Confirm</button>
                    </div>

                </fieldset>

            </form>

        </div >
    );
}

export default MembersPage;