import React, { useEffect, useState } from "react";
import { getPublicRoutines } from "../api";

const Routines = ({token}) => {
    const [routines, setRoutines] = useState([]);
    const [selectRoutine, setSelectRoutine] = useState(null);

    useEffect(() => {
        const fetchPublicRoutines = async () => {
            const result = await getPublicRoutines();
            setRoutines(result);
        }
        fetchPublicRoutines();
    }, []);
    return routines.map((routine) => (
        <div key={routine.id} className="publicRoutinesContainer">
            <div>
                <h2>{routine.name} by {routine.creatorName}</h2>
                <p>Goal: {routine.goal}</p>
                <button onClick={() => 
                    setSelectRoutine(
                        selectRoutine === routine.id ? null : routine.id)
                    }
                >
                    {selectRoutine== routine.id ? "Hide Activities" : "Show Activities"}
                </button>
                {selectRoutine === routine.id && (
                    <div className="attachedActivitiesContainer">
                        {routine.activties.map((activity) => 
                            <div key={activity.id}>
                                <h3>{activity.name}</h3>
                                <p>{activity.description}</p>
                                <p>Count: {activity.count}</p>
                                <p>Duration: {activity.duration}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    ))
}

export default Routines;