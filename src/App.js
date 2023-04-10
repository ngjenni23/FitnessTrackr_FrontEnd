import './App.css';
import React, { useState } from 'react';
import { Router, Routes, Route } from "react-router-dom";
import { Activities,
        Header, 
        Login,
        MyRoutines,
        Navbar,
        Register,
        Routines
} from './components';

function App() {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  return(
    <Router>
      <div className='mainContainer'>
        <Header/>
        <Navbar token={token} setToken={setToken}/>
          <div className='bodyContainer'>
            <Routes>
                <Route exact path='/' element={Activities} token={token} setToken={setToken} user={user} setUser={setUser}/>
                <Route path='/activities' element={Activities} token={token} setToken={setToken} user={user} setUser={setUser}/>
                <Route path='/routines' element={Routines} token={token} setToken={setToken} user={user} setUser={setUser}/>
                <Route path='myRoutines' element={MyRoutines} token={token} setToken={setToken} user={user} setUser={setUser}/>
                <Route path='/Register' element={Register} token={token} setToken={setToken} user={user} setUser={setUser}/>
                <Route path='/Login' element={Login} token={token} setToken={setToken} user={user} setUser={setUser}/>
            </Routes>
          </div>
      </div>`
    </Router>
  )
}

export default App;