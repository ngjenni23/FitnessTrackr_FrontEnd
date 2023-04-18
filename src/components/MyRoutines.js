import React, { useEffect, useState } from "react";
import { getUserRoutines, deleteRoutine, deleteRoutineActivity, updateRoutine, updateCountOrDuration } from "../api";
import { useNavigate } from "react-router-dom";

const MyRoutines = (props) => {
    const {isLoggedIn, loggedInUser} = props;
    const {myRoutines, setMyRoutines} = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    const fetchMyRoutines = async () => {
        const result = await getUserRoutines(loggedInUser);
        setMyRoutines(result);
    };
    fetchMyRoutines();
    }, [loggedInUser]);

    const handleDeleteRoutine = async(routineId) => {
        await deleteRoutine(routineId);
        setMyRoutines(myRoutines.filter((routine) => routine.id !== routineId));
   };

    const handleDeleteRoutineActivity = async(routineActivityId) => {
        const result = await deleteRoutineActivity(routineActivityId);
        setMyRoutines(myRoutines.map((routine) => {
        if (routine.id === selectedRoutine) {
            return {
                ...routine,
                activities: routine.activities.filter((activity) => activity.routineActivityId !== routineActivityId)
            }
        } else {
            return routine;
        }
        }))
    }
    
    const handleUpdateRoutine = async(routineId) => {
        const result = await updateRoutine(
            name, 
            goal, 
            isPublic
        )
    }

    const handleUpdateRoutineActivity = async(routineActivityId) => {
        const result = await updateCountOrDuration(
            count, 
            duration
        )
    }

    function handleIsPublic() {
        setIsPublic(!isPublic)
    }
    
    return  (
        <div>
            <div>
                <h1>My Routines</h1>
                <button onClick={() => navigate('/AddRoutine')}> Create a new Routine </button>
            </div>
        { myRoutines.map((routine) => (
            <div className='routinesContainer' key={routine.id}>
                <div>
                 <h3>{routine.name} by {routine.creatorName}</h3> 
                <p>Goal: {routine.goal} </p>
                <form onSubmit={handleUpdateRoutine}>
                    <h3>Update Routine</h3>
                    <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                    <input type="text" placeholder="Goal" value={goal} onChange={(event) => setGoal(event.target.value)}/>
                    <p>Make Routine Public?</p>
                        <input type='radio' name='Yes' onChange={handleIsPublic}/>
                    <button type='submit'>Update</button>
                </form>
                <button onClick={() => handleDeleteRoutine(routine.id)}>Delete routine</button>
                <button onClick={() => navigate(`/AddRoutineActivity/${routine.id}`)}>Add Routine Activity </button>
                <button onClick={() => setSelectedRoutine(selectedRoutine === routine.id ? null : routine.id)}>
                    {selectedRoutine === routine.id ? "Hide activities" : "Show activities"}
                </button>
                    {selectedRoutine === routine.id && (
                        <div>
                            {routine.activities.map((activity) => (
                                <div  key={activity.routineActivityId}>
                                    <h3>{activity.name}</h3>
                                    <p>{activity.description}</p>
                                    <p>Count: {activity.count} reps</p>
                                    <p>Duration: {activity.duration} minutes</p>
                                    <button onClick={() => handleDeleteRoutineActivity(activity.routineActivityId)}>Delete Routine Activity</button>

                                    <form onSubmit={handleUpdateRoutineActivity}>
                                        <h3>Update Count or Duration</h3>
                                        <input placeholder="Count" value={count} onChange={(event) => setCount(event.target.value)}/>
                                        <input placeholder="Duration" value={duration} onChange={(event) => setDuration(event.target.value)}/>
                                        <button type="submit">Update</button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        ))}
    </div>
    )
}

export default MyRoutines