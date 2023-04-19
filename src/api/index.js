import { API } from '../config';
const token = localStorage.getItem('jwt');

//  POST /users/register
export const registerUser = async(username, password) => {
    try {
        const resp = await fetch(`${API}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const result = await resp.json();
        console.log("register:", result);
        return result;
    } catch (err) {
        console.error(err);
    }
}

//  POST /users/login
export const loginUser = async(credentials) => {
    try{
        const resp = await fetch(`${API}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials
            })
        })
        const result = await resp.json();
        console.log("login:", result);
        if (result && result.token) {

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
export const getUserRoutines = async(username, token) => {
    try {
        const resp = await fetch(`${API}/users/${username}/routines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = resp.json();
        console.log("routines:", result);
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
export const createActivity = async(name, description) => {
    try {
        const resp = await fetch(`${API}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                description
            }),
        })
        const result = await resp.json();
        console.log("createActivit:", result);
        return result;
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
export const createRoutine = async(name, goal, isPublic) => {
    try {
    const resp = await fetch(`${API}/routines`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic
      })
    });
    const result = await resp.json();
    console.log("createRoutine:",result);
    return result
  } catch (err) {
    console.error(err);
  }
}

// PATCH /routines/:routineId
export const updateRoutine = async(routineId, name, goal) => {
    try {
      const resp = await fetch(`${API}/routines/${routineId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal
        })
      });
      const result = await resp.json();
      console.log("updateRoutine:",result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// DELETE /routines/:routineId
export const deleteRoutine = async(routineId) => {
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
export const attachActivityToRoutine = async(routineId, activityId, count, duration) => {
    try {
      const resp = await fetch(`${API}/routines/${routineId}/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId,
          count,
          duration
        })
      });
      const result = await resp.json();
      console.log("attachActivityToRoutine:", result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// PATCH /routine_activities/:routineActivityId
export const updateCountOrDuration = async(routineActivityId, count, duration) => {
    try {
      const resp = await fetch(`${API}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          count,
          duration,
        })
      });
      const result = await resp.json();
      console.log("updateCountOrDuration:", result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// DELETE /routine_activities/:routineActivityId
export const deleteRoutineActivity = async(routineActivityId) => {
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