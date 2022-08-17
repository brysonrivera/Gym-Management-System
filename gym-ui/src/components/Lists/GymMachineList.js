import React from 'react';
import GymMachine from '../records/GymMachine'

function GymMachineList({ gymMachines, deleteMachine }) {
    return (
        <>
            {gymMachines.map((gymMachine, i) => <GymMachine key={i} gymMachine={gymMachine} deleteMachine={deleteMachine} />)}

        </>
    );
}

export default GymMachineList;