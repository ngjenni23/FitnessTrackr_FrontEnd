import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Activities,
        AddRoutine,
        AddRoutineActivity,
        Header, 
        Login,
        MyRoutines,
        Navbar,
        Register,
        Routines
} from './components';

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [allActivities, setAllActivities] = useState([]);

  return(
    <Router>
      <div className='mainContainer'>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        <Navbar isLoggedIn={isLoggedIn}/>
          <div className='bodyContainer'>
            <Routes>
                <Route path='/' element={<Activities allActivities={allActivities} setAllActivities={setAllActivities}/>}/>
                <Route path='/Activities' element={<Activities allActivities={allActivities} setAllActivities={setAllActivities}/>}/>
                <Route path='/AddRoutine' element={<AddRoutine isLoggedIn={isLoggedIn} loggedInUser={loggedInUser}/>}/>
                <Route path='/AddRoutineActivity/:routineId' element={<AddRoutineActivity allActivities={allActivities} setAllActivities={setAllActivities}/>}/>
                <Route path='/Routines' element={<Routines/>}/>
                <Route path='/MyRoutines' element={<MyRoutines loggedInUser={loggedInUser} />}/>
                <Route path='/Register' element={<Register/>}/>
                <Route path='/Login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            </Routes>
          </div>
      </div>
    </Router>
  )
}

export default App;