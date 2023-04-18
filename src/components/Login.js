import React, { useState } from "react";
import { loginUser } from "../api";
         

const Login = (props) => {
    const {setIsLoggedIn, setLoggedInUser, setUserId} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async(event) => {
        event.preventDefault();
        const result = await loginUser(
            username, 
            password
        )
        if (result.token) {
            setIsLoggedIn(true);
            setLoggedInUser(username);
            setUserId(result.user.id)
        } else {
            alert(`Username or Password is incorrect.`);
        }
    }

    return(
       <form onSubmit={handleLogin} className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}></input>
            <input type="text" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}></input>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login