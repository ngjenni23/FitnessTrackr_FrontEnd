import React, { useEffect, useState } from "react";
import { getUserRoutines, 
    getAllActivities, 
    attachActivityToRoutine, 
    deleteRoutine, 
    updateRoutine, 
    updateCountOrDuration, 
    deleteRoutineActivity 
} from "../api";
import AddRoutine from "./AddRoutine";

const MyRoutines = () => {
    const [ routines, setRoutines ] = useState([]);
    const [ routineId, setRoutineId ] = useState();
    const [ open, setOpen ] = useState(false);
    const [ activities, setActivities ] = useState([]);
    const [ activityId, setActivityId] = useState();
    const [ routineActivityId, setRoutineActivityId ] = useState();
    const [ name, setName ] = useState('');
    const [ goal, setGoal ] = useState('');
    const [ isPublic, setIsPublic ] = useState(false);
    const [ count, setCount ] = useState('');
    const [ duration, setDuration ] = useState('');

    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username')

    useEffect(() => {
    const fetchMyRoutines = async () => {
        console.log("User routines", routines);
        console.log("Username and token:", username, token)
        const routineResult = await getUserRoutines(username, token);
        setRoutines(routineResult);

        const activityResult = await getAllActivities();
        setActivities(activityResult)

        
    };
    fetchMyRoutines();
    }, []);

    function handleOpen() {
        setOpen(!open);
    }

    const handleAttachActivityToRoutine = async event => {
        event.preventDefault();
        setActivityId(event.target[3].value);
        setRoutineId(event.target[4].value);

        const result = {
            activityId, count, duration
        }
        
        window.alert("Successfully added activity to routine! Please refresh page.")
        await attachActivityToRoutine(routineId, result);
    }

    const handleDeleteRoutine = async event => {
        event.preventDefault();
        setRoutineId(event.target[1].value);

        window.alert("Successfully deleted routine! Please refresh page.");
        await deleteRoutine(routineId, token);
   };

    const handleDeleteRoutineActivity = async event => {
        event.preventDefault();
        setRoutineActivityId(event.target[1].value);

        window.alert("Successfully deleted routine activity! Please refresh page.")
        await deleteRoutineActivity(routineActivityId, token);
    }
    
    const handleUpdateCountOrDuration = async event => {
        event.preventDefault();
        setRoutineActivityId(event.target[3].value);
        const result = {
            count, 
            duration
        }

        window.alert("Successfully updated routine! Please refresh page.")
        await updateCountOrDuration(routineActivityId, result, token)
    }

    const handleUpdateRoutine = async event => {
        event.preventDefault();
        const result = {
            name, 
            goal, 
            isPublic
        }
        
        window.alert("Sucessfully updated routine! Please refresh page.")
        await updateRoutine(routineId, result, token)
    }
    
    return <div className="myRoutines"> 
        <h1>My Routines</h1>
        <div className="newRoutine">
                <AddRoutine/>
        </div>
        {routines === [] ? <div className="noRoutines">
            <h3> You have no routines.</h3>
        </div> : routines.map((routine) => (
        <div>
            <div key={routine.id} className="routine">
                <h3>{routine.name} by {routine.creatorName} </h3>
                <p>Is Public? {routine.isPublic ? "Yes" : "No"}</p> 
                <p>Goal: {routine.goal}</p>
                <div>
                    <form onSubmit={handleUpdateRoutine} className="updateRoutine">
                        <input type="text" placeholder="Name" onChange={event => setName(event.target.value)} />
                        <input type="text" placeholder="Goal" onChange={event => setGoal(event.target.value)} />
                        <span>Make Routine Public?
                            Yes <input type='checkbox' onChange={event => setIsPublic(true)}/> 
                            No <input type='checkbox' onChange={event => setIsPublic(false)}/>
                        </span>
                        <button type="submit">Click TWICE to Update Routine</button>
                        <input value={routine.id} className="hidden"></input>
                    </form>
                </div>
                <form onSubmit={handleDeleteRoutine}>
                    <button type="submit">Click TWICE to Delete Routine</button>
                    <input value={routine.id} class="hidden"></input>
                </form>
                <div>
                <div className="showActivities">
                        <button onClick={handleOpen}> {open ? "Hide Activities" : "Show Activities"} </button>
                </div>
                    <div>
                    { open ? activities.map((activity) => (
                    <div key={activity.id} className="myRoutineActivities">
                        <h3>Activities</h3>
                        <form onSubmit={handleAttachActivityToRoutine}>
                            <h4>{activity.name}</h4>
                            <p>{activity.description}</p>
                            <input type="number" placeholder="Count (reps)" onChange={event => setCount(event.target.value)}/>
                            <input type="number" placeholder="Duration (minutes)" onChange={event => setDuration(event.target.value)}/>
                            <button type="submit">Click TWICE to Attach Activity</button>
                            <input value={activity.id} className="hidden"/>
                            <input value={routine.id} className="hidden"/>
                        </form>
                    </div>
                    )) : null}
                    </div>
                </div>
                <div>
                    
                    {routine.activities.map((activity) => (
                        <div key={activity.id}>
                            <form onSubmit={handleDeleteRoutineActivity}>
                                <button>Click TWICE To Delete Activity</button>
                                <input value={activity.routineActivityId} className="hidden"/>
                            </form>
                            <h3>{activity.name}</h3>
                            <p>{activity.description}</p>
                            <p>{activity.count} reps</p>
                            <p>{activity.duration} minutes</p>
                            <form onSubmit={handleUpdateCountOrDuration}>
                                <input type="number" placeholder="Count (reps)" onChange={event => setCount(event.target.value)} />
                                <input type="number" placeholder="Duration (minutes)" onChange={event => setDuration(event.target.value)}/>
                                <button type="submit">Click TWICE to Update Activity</button>
                                <input value={activity.routineActivityId} className="hidden"/>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ))}
    </div>
}

export default MyRoutines