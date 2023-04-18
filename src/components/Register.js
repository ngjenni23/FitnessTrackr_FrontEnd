import React, { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../api";

const Register = ({token, setToken, user, setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.PreventDefault();
        if(password < 8 ) {
            alert('Password must be at least 8 character long.');
        }
        const userObj = await registerUser(
            username, 
            password
        )
        setToken(userObj.token);
        setUser(userObj.user.username);
        if(userObj.token) {
            navigate('/Login');
        }
    }
    return (
        <form onSubmit={handleSubmit} className="register">
            <h1>Create Account</h1>
            <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
            <input type="text" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register;