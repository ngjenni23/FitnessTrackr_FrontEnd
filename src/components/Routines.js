import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../api";


//add update funciton
const Routines = () => {
    const [publicRoutines, setPublicRoutines] = useState([]);

    useEffect(() => {
        const fetchPublicRoutines = async () => {
            const result = await getPublicRoutines();
            setPublicRoutines(result);
        }
        fetchPublicRoutines();
    }, []);
    
    return publicRoutines.map((routine) => (
        <div key={routine.id} class="routine">
            <h3>{routine.name} by {routine.creatorName}</h3>
            <p>Goal: {routine.goal}</p>
            <div className="routineActivity">
                <h4>Activities:</h4>
                {routine.activities.map((activity) => 
                    <div key={activity.id}> 
                        <p> {activity.name} </p>
                        <p> {activity.description} </p>
                        <p>Count: {activity.count} reps</p>
                        <p>Duration: {activity.duration} minutes</p>
                    </div>
                )}
            </div>
        </div>
    ));
}

export default Routines;