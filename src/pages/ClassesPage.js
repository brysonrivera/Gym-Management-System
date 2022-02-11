import React from 'react';
import Nav from '../components/nav/Nav';
import ClassList from '../components/Lists/ClassList'
import {useState} from 'react';

function ClassesPage() {
    const [classes, setClasses] = useState([]);
    
    const onDelete = classesID => {
        console.log('trigger delete')
    }

    const onEdit = classes => {
        console.log('trigger edit function')
    }

    return (
        <div className="main-container">
            <Nav />
            <h1>Classes</h1>
            <table>
                <thead>
                    <tr>
                        <th>classID</th>
                        <th>startTime</th>
                        <th>classType</th>
                        <th>signupCounter</th>
                        <th>employeeID</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <ClassList className="list-container" classes={classes} onDelete={onDelete} onEdit={onEdit} />
                </tbody>
            </table>
        </div>
    );
}

export default ClassesPage;