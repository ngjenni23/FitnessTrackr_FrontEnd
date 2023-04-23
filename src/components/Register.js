import React, { useState } from "react";
import { registerUser } from "../api";

const Register = ({ token, setToken, user, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async event => {
        event.preventDefault();
        const result = await registerUser({
            user: { username, 
                password}
    })
        setToken(result.token);
        setUser(result.user.username);
        window.alert("Sucessfully registered!");
    }
    return (
        <form onSubmit={handleRegister} className="register">
            <h1>Create Account</h1>
            <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
            <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register;