import React from 'react';
import Class from '../records/Class'

function ClassList({ classes, deleteClass }) {
    console.log(classes)
    return (
        <>
            {classes.map((class_, i) => <Class class_={class_} key={i} deleteClass={deleteClass} />)}

        </>
    )
}

export default ClassList;