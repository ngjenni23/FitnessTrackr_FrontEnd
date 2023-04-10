import React, { useState } from "react";
import { loginUser } from "../api";
import { useNavigate } from "react-router";

const Login = ({token, setToken, user, setUser}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        const userObj = await loginUser({
            username,
            password
        });
        console.log("login:", userObj.token, userObj.user.username);
        setToken(userObj.token);
        setUser(userObj.user.username);
        if(userObj.token){
            navigate('/')
        }
    }
    return(
        <form onSubmit={handleSubmit} className="login">
            <p>Login</p>
            <input type="text" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
            <imput type="text" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login