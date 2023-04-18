import React, { useEffect, useState } from "react";
import { createActivity, getAllActivities, updateActivity } from "../api";

const Activities = (props) => {
    const { allActivities, setAllActivities } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchActivities = async () => {
            const result = await getAllActivities();
            console.log("result",result);
            setAllActivities(result);
        }
        fetchActivities();
    }, [setAllActivities]);
    console.log("show activities");

    const handleAddActivity = async(event) => {
        event.preventDefault();
        const result = await createActivity(
            name, 
            description
        )
        if (result.error) {
            alert(`${name} already exists.`)
            return;
        }
        alert(`${name} sucessfully created!`)
    }

     const handleUpdateActivity = async(event) => {
        event.preventDefault();
        const result = await updateActivity(
            name, 
            description
        )
    }

    return( 
        <div>
            <div className="activitiesHeader">
                <h1 className="activitiesHeader">
                    Activities
                </h1>
                <form className="newActivityForm" onSubmit={handleAddActivity}>
                    <h3>Create New Activity</h3>
                    <input type="text" placeholder="Name" onChange={event => setName(event.target.value)}/>
                    <input type="text" placeholder="Description" onChange={event => setDescription(event.target.value)}/>
                    <button type="submit">Create Activity</button>
                </form>
            </div>
            { allActivities.map(activity => (
                <div className="activities">
                    <h2>Activity Name: {activity.name} </h2>
                    <p>Description: {activity.description} </p>
                    <form onSubmit={handleUpdateActivity}>
                        <h3>Update Activity</h3>
                        <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                        <input type="text" placeholder="Description" value={description} onChange={(event) => setDescription(event.target.value)}/>
                        <button type="submit">Update</button>
                    </form>
                </div>
            ))}
        </div>
    )
}

export default Activities;