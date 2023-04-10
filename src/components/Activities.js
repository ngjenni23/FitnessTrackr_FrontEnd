import React, { useEffect, useState } from "react";
import { getAllActivities } from "../api";

const Activities = () => {
    const [ activities, setActivities ] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            const result = await getAllActivities();
            setActivities(result);
        }
        fetchActivities();
    }, []);
    return( 
        <div className="activitiesPageContainer">
            <h1 className="activitiesHeader">
                Activities
            </h1>
            { activities.map(activity => (
                <div className="activitiesContainer">
                    <h2>Activity Name: {activity.name} </h2>
                    <p>Description: {activity.description} </p>
                </div>
            ))}
        </div>
    )
}

export default Activities;