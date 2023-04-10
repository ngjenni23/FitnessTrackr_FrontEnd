import React, { useEffect, useState } from "react";
import { getUserRoutines, deleteRoutine, deleteRoutineActivity } from "../api";
import { useNavigate } from "react-router";

const MyRoutines = ({token, setToken, user}) => {
    const [myRoutines, setMyRoutines] = useState([]);
    const [selectRoutine, setSelectRoutine] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyRoutines = async () => {
            const result = await getUserRoutines(user, token);
            setMyRoutines(result);
        };
        fetchMyRoutines();
    }, []);

   const handleDelete = async (routineId) => {
    const result = await deleteRoutine(routineId);
    
   }
}

export default MyRoutines