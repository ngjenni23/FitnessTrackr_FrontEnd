import React, { useState } from 'react';
import { createRoutine } from '../api';
import { useNavigate } from 'react-router-dom';

const AddRoutine = () => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();
    const token = window.localStorage.getItem('token');


    const handleAddRoutine = async(event) => {
        event.preventDefault();
        const result = {
            name,
            goal,
            isPublic
        }
        
        await createRoutine(result, token);
        if (token === null) {
            window.alert('You must be logged in to create a routine.');
            navigate('/Login');
        } 
        window.alert('Sucessfully created routine!')
    }


    return (
        <form onSubmit={handleAddRoutine} className='newRoutine'>
            <h3>Create New Routine</h3>
            <input type='text' placeholder='Name' onChange={(event) => setName(event.target.value)}/>
            <input type='text' placeholder='Goal' onChange={(event) => setGoal(event.target.value)}/>
            <div className='isPublic'>
                <p>Make Routine Public?</p>
                <p>Yes</p>
                <input type='checkbox' onChange={event => setIsPublic(true)}/>
                <p>No</p>
                <input type='checkbox' onChange={event => setIsPublic(false)}/>
            </div>
            <button type='submit'>Create Routine</button>
        </form>
    )
}

export default AddRoutine;