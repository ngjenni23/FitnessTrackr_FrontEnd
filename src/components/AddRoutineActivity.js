import React, { useState } from 'react';
import { attachActivityToRoutine } from '../api';
import { useParams } from 'react-router-dom';

const AddRoutineActivity = (props) => {
    const { routineId } = useParams();
    const { allActivities } = props;
    const [count, setCount] = useState('');
    const [duration, setDuration] = useState('');
    const [activityId, setActivityId] = useState('');

    const handleAddRoutineActivity = async(event) => {
        event.preventDefault();
        const result = await attachActivityToRoutine(
            routineId,
            activityId,
            count,
            duration,
        )
    }
    return (
        <form className="newRoutineActivityForm" onSubmit={handleAddRoutineActivity}>
            <h1>Create New Routine Activity</h1>
            <select value={activityId} onChange={(event) => setActivityId(event.target.value)}>
                <option value=''>Select an activity</option>
                    {allActivities.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                        {activity.name}
                         </option>
                    ))}
            </select>
            <input placeholder="Count" value={count} onChange={event => setCount(event.target.value)}/>
            <input placeholder="Duration" value={duration} onChange={event => setDuration(event.target.value)}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default AddRoutineActivity;