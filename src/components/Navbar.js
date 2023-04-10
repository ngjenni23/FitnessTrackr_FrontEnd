import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import {
    Activities,
    Routines,
    MyRoutines,
    Register,
    Login
} from './index'

const Navbar = ({token, setToken}) => {
    const [user, setUser] = useState();
    return (
    <>    
        <BrowserRouter>
            <div className='navContainer'>
                <Link to="/activitites">Activities</Link>
                <Link to="/routines">Routines</Link>
                <Link to="/myRoutines">My Routines</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        </BrowserRouter>
    </>
    )
}

export default Navbar;
