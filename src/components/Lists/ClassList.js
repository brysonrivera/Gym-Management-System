import React from 'react';
import Class from '../records/Class'

function ClassList({ classes, onDelete, onEdit }) {
    return (
        <>
            {classes.map((class_, i) => <Class classes={class_} key={i} onDelete={onDelete} onEdit={onEdit} />)}

        </>
    );
}

export default ClassList;