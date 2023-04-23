import React, { useState } from "react";
import { loginUser } from "../api";
         

const Login = ({ token, setToken, user, setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async(event) => {
        event.preventDefault();
        console.log("user", username, password)
        const result = await loginUser({
            username, 
            password
    });
        console.log("Username and token:", result.user.username, result.token);
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('username', result.user.username);
        setToken(result.token);
        setUser(result.user.username);
        window.alert("Sucessfully logged in!");
    }

    return(
       <form onSubmit={handleLogin} className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}></input>
            <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}></input>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login