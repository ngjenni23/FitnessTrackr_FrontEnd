import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../api";


//add update funciton
const Routines = () => {
    const [publicRoutines, setPublicRoutines] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);

    useEffect(() => {
        const fetchPublicRoutines = async () => {
            const result = await getPublicRoutines();
            setPublicRoutines(result);
        }
        fetchPublicRoutines();
    }, []);
    
    return (
        <div>
            <h1>Routines</h1>
            {publicRoutines.map((routine) => (
                <div  key={routine.id}>
                    <h3>{routine.name} by {routine.creatorName}</h3>
                    <p>Goal: {routine.goal}</p>

                    <button onClick={() => setSelectedRoutine(selectedRoutine === routine.id ? null : routine.id)}>
                        {selectedRoutine === routine.id ? 'Hide activities' : 'Show activities'}
                    </button>

                    {selectedRoutine === routine.id && (
                        <div>
                            {routine.activities.map((activity) => (
                                <div key={activity.id}>
                                    <h3>{activity.name}</h3>
                                    <p>{activity.description}</p>
                                    <p>Count: {activity.count} reps</p>
                                    <p>Duration: {activity.duration} minutes</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
         </div>
     );
}

export default Routines;