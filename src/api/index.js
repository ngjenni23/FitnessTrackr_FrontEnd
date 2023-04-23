import { API } from '../config';
const token = localStorage.getItem('jwt');

//  POST /users/register
export const registerUser = async(credentials) => {
    console.log("From api:", credentials)
    const { username, password } = credentials.user;
    console.log("Username and password", username, password)
    try {
        const resp = await fetch(`${API}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        const result = await resp.json();
        console.log("Register:", result);
        if (result.error === "Duplicate Username") {
            window.alert("Username is taken")
        }
        if (result.error === "Short password") {
            window.alert("Password is too short");
        }
        return result;
    } catch (err) {
        console.error(err);
    }
}

//  POST /users/login
export const loginUser = async(credentials) => {

    try{
        console.log("From api", credentials)
        const resp = await fetch(`${API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                credentials
            )
        })
        const result = await resp.json();
        console.log("login:", result);
        if (result.error === "User does not exist") {
            window.alert("Username does not exist.")
        }
        if (result.message === "Password is incorrect") {
            window.alert("Password is incorrect")
        }
        return result;
    } catch(err) {
        console.error(err);
    }
}

// GET /users/me
export const getMyData = async() => {
    try {
        const resp = await fetch(`${API}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = resp.json();
        console.log("me:", result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

// GET /users/:username/routines
export const getUserRoutines = async( username, token ) => {
    try {
        const resp = await fetch(`${API}/users/${username}/allroutines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await resp.json();
        console.log("API User routines:", result);
        if(result.error) {
            throw result.error;
        }
        return result;
    } catch(err) {
        console.error(err);
    }
}

// GET /activities
export const getAllActivities = async() => {
    try {
        const resp = await fetch(`${API}/activities`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await resp.json();
        console.log("activities:", result);
        return result;
    } catch(err) {
        console.log(err);
    }
}

// POST /activities
export const createActivity = async(postObj, userToken) => {
    try {
        const resp = await fetch(`${API}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(
                postObj
            ),
        })
        const result = await resp.json();
        console.log("createActivity:", result);
        if (result.error === "Name already exists") {
            window.alert("An activity with that name already exists")
        } else {
            return result;
        }
    } catch(err) {
        console.error(err);
    }
}

// PATCH /activities/:activityId
export const updateActivity = async(name, description) => {
    try {
        const resp = await fetch(`${API}/activities`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: 'PATCH',
            body: JSON.stringify({
                name,
                description
            }),
        })
        const result = resp.json();
        console.log("updateActivity:", result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

// GET /activities/:activityId/routines
export const getPublicRoutineByActivity = async(activityId) => {
    try{
        const resp = await fetch(`${API}/activities/${activityId}/routines`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await resp.json();
        console.log("publicRoutinesByActivity:", result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

// GET /routines
export const getPublicRoutines = async() => {
    try {
        const resp = await fetch(`${API}/routines`, {
             headers: {
                'Content-Type': 'application/json',
            }
        })
        const result = await resp.json();
        console.log("publicRoutines:", result);
        return result;
    } catch(err) {
        console.error(err);
    }
}

// POST /routines
export const createRoutine = async(postObj, userToken) => {
    try {
    const resp = await fetch(`${API}/routines`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(
        postObj
      )
    });
    const result = await resp.json();
    console.log("createRoutine:",result);
    return result
  } catch (err) {
    console.error(err);
  }
}

// PATCH /routines/:routineId
export const updateRoutine = async( routineId, obj, token ) => {
    try {
      const resp = await fetch(`${API}/routines/${routineId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            obj
        )
      });
      const result = await resp.json();
      console.log("updateRoutine:",result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// DELETE /routines/:routineId
export const deleteRoutine = async( routineId, token ) => {
    try {
      const resp = await fetch(`${API}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
      });
      const result = await resp.json();
      console.log("deleteRoutine:", result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// POST /routines/:routineId/activities
export const attachActivityToRoutine = async(routineId, obj) => {
    try {
      const resp = await fetch(`${API}/routines/${routineId}/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          obj
        )
      });
      const result = await resp.json();
      console.log("attachActivityToRoutine:", result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// PATCH /routine_activities/:routineActivityId
export const updateCountOrDuration = async( routineActivityId, obj, token ) => {
    try {
      const resp = await fetch(`${API}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
            obj
        )
      });
      const result = await resp.json();
      console.log("updateCountOrDuration:", result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// DELETE /routine_activities/:routineActivityId
export const deleteRoutineActivity = async( routineActivityId, token ) => {
    try {
    const resp = await fetch(`${API}/routine_activities/${routineActivityId}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    });
    const result = await resp.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}