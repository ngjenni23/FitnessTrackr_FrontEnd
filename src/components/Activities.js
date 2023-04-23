import React, { useEffect, useState } from "react";
import { createActivity, getAllActivities } from "../api";

const Activities = ({ token }) => {
    const [allActivities, setAllActivities] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchActivities = async () => {
            const result = await getAllActivities();
            console.log("result",result);
            setAllActivities(result);
        }
        fetchActivities();
    }, []);
    console.log("show activities");

    const handleAddActivity = async(event) => {
        event.preventDefault();
        const result = {
            name, 
            description
        }
        await createActivity(result, token)
        if (result.error) {
            window.alert(`${name} already exists.`)
            return;
        } else if (!token){
            window.alert("Must be logged in to create an activity.")
        } else {window.alert('Activity sucessfully created! Please refresh the page.')
    }
        
    }

    return( 
        <div classname="activitiesMain">
            <div>
                <h1 className="activitiesHeader">
                    Activities
                </h1>
                <form className="newActivityForm" onSubmit={handleAddActivity}>
                    <h3>Create New Activity</h3>
                    <span>
                        <input type="text" placeholder="Name" onChange={event => setName(event.target.value)}/>
                        <input type="text" placeholder="Description" onChange={event => setDescription(event.target.value)}/>
                        <button type="submit">Create Activity</button>
                    </span>
                </form>
            </div>
            <div className="activitiesContainer">
                { allActivities.map((activity) => (
                    <div className="activities">
                        <h2>{activity.name}</h2>
                        <p>{activity.description} </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Activities;