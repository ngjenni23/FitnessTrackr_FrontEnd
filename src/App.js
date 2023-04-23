import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Activities,
        AddRoutine,
        Header, 
        Login,
        MyRoutines,
        Navbar,
        Register,
        Routines
} from './components';

function App() {
  const [ token, setToken ] = useState('');
  const [ user, setUser ] = useState('');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
      if (localStorage.getItem("token")) {
          setIsLoggedIn(true);
      }
    }, []);

  return(
    <Router>
      <div className='mainContainer'>
        <Header />
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          <div className='bodyContainer'>
            <Routes>
                <Route 
                  path='/' 
                  element={<Activities token={token} setToken={setToken} />}
                />
                <Route 
                  path='/Activities' 
                  element={<Activities token={token} setToken={setToken} />}
                />
                <Route 
                  path='/AddRoutine' 
                  element={<AddRoutine token={token} setToken={setToken}/>}
                />
                <Route 
                  path='/Routines' 
                  element={<Routines token={token} setToken={setToken}/>}
                />
                <Route 
                  path='/MyRoutines' 
                  element={<MyRoutines token={token} setToken={setToken} user={user} setUser={setUser}/>}
                />
                <Route 
                  path='/Register' 
                  element={<Register token={token} setToken={setToken} user={user} setUser={setUser}/>}
                />
                <Route 
                  path='/Login' 
                  element={<Login token={token} setToken={setToken} user={user} setUser={setUser}/>}
                />
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;