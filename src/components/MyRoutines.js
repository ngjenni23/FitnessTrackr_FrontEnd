import React, { useEffect, useState } from "react";
import { getUserRoutines } from "../api";
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

    useEffect(() => {
        if (!user)
    })
}

export default MyRoutines