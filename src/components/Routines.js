import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../api";
import AddRoutine from "./AddRoutine";


//add update funciton
const Routines = () => {
    const [publicRoutines, setPublicRoutines] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchPublicRoutines = async () => {
            const result = await getPublicRoutines();
            setPublicRoutines(result);
        }
        fetchPublicRoutines();
    }, []);

     function handleOpen() {
        setOpen(!open);
    }
    
    return <div className="pubRoutinesContainer"> 
        <h1>Public Routines</h1>
        <div className="newRoutine">
            <AddRoutine/>
        </div>
        <div className="pubroutines">{ publicRoutines.map((routine) => (
            <div key={routine.id} class="routine">
                <h3>{routine.name} by {routine.creatorName}</h3>
                <p>Goal: {routine.goal}</p>
                <div className="showActivities">
                        <button onClick={handleOpen}> {open ? "Hide Activities" : "Show Activities"} </button>
                </div>
                <div>
                    { open ? routine.activities.map((activity) => (
                    <div className="pubRoutineActivityContainer">
                        <div key={activity.id} className="pubRoutineActivities"> 
                            <h5> {activity.name} </h5>
                            <p> {activity.description} </p>
                            <p>Count: {activity.count} reps</p>
                            <p>Duration: {activity.duration} minutes</p>
                        </div>
                    </div>
                    )) : null}
                 </div>
            </div>
        ))}
        </div>
    </div>
}

export default Routines;

