import React, { useEffect, useState } from 'react';
import { createRoutine } from '../api';

const AddRoutine = (props) => {
    const {isLoggedIn} = props;
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);


    const handleAddRoutine = async(event) => {
        event.preventDefault();
        const result = await createRoutine(
            name,
            goal,
            isPublic ? true : false
        )
    }

    function handleIsPublic() {
        setIsPublic(!isPublic)
    }

    useEffect(() => {
        if (!isLoggedIn) {
            alert(`Must be logged in to create a routine.`)
        }
    }, [isLoggedIn]);

    return (
        <form onSubmit={handleAddRoutine}>
            <h1>Create New Routine</h1>
            <input type='text' placeholder='Name' onChange={(event) => setName(event.target.value)}/>
            <input type='text' placeholder='Goal' onChange={(event) => setGoal(event.target.value)}/>
            <p>Make Routine Public?</p>
            <input type='radio' name='Yes' onChange={handleIsPublic}/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default AddRoutine;