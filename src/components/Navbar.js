import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    function logout() {
        window.localStorage.removeItem('token');
        window.location.assign("/");
        alert("You're Logged Out!")
    }

    return (
    <> 
            <div className='navContainer'>
                <h1 className="link"><Link to='/Activities'>Activities</Link></h1>
                <h1 className="link"><Link to='/Routines'>Routines</Link></h1>
                <h1 className="link"><Link to='/MyRoutines' >My Routines</Link></h1>
                <h1 className="link"> <Link to='/Register'>Register</Link></h1>
                <h1 className="link"><Link to='/Login'>Login</Link></h1>
                <h1 className="link"><Link to='/' onClick={() => logout()}>Logout</Link></h1>
            </div>
    </>
    )
}

export default Navbar;
