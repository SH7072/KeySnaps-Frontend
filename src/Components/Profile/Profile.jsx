import React, { useState, useEffect } from 'react'
import { createStyles } from "@mantine/core";
import User from './ProfileComponents/User';
import History from './ProfileComponents/History';
import Stat from './ProfileComponents/Stat';
import New from './ProfileComponents/New';
import { H1 } from 'tabler-icons-react';
import NavBar from '../NavBar/NavBar';


const useStyles = createStyles((theme) => ({
    main_container: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        backgroundColor: 'white',
        width: '65vw',
        margin: "0 auto",
        padding: '2rem 1rem 1rem 1rem',
    },
}));

const Profile = () => {

    const { classes, theme } = useStyles();
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn == null) {
        sessionStorage.setItem('isLoggedIn', false);
        isLoggedIn = "false";
    }
    const username = sessionStorage.getItem('username');
    const recentStats = sessionStorage.getItem('recentStats');
    const userId = sessionStorage.getItem('userId')
    const [scores, setScore] = useState([]);
    const [data, setData] = useState(null);

    const [stats, setStats] = useState([]);
    // if (recentStats !== null) {
    //     const recentStatsObj = JSON.parse(recentStats);

    //     setStats(recentStatsObj);
    //     console.log(recentStatsObj);
    // }
    // console.log(stats);
    // console.log(username);
    const fetchUser = async () => {
        console.log(userId);
        const url = `${process.env.REACT_APP_BACKEND_URL}/user/getUser/${userId}`

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const status = res.status;
            // console.log(data.scores);
            setScore(data.scores);
            setData(data)
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        userId && fetchUser()
        if (recentStats !== null) {
            const recentStatsObj = JSON.parse(recentStats);

            setStats(recentStatsObj);
            // console.log(recentStatsObj);
        }
    }, [])
    // console.log(stats.length);
    if (isLoggedIn === 'true') {
        return (
            <>
                <NavBar />
                <div className={classes.main_container}>
                    {console.log(isLoggedIn)}
                    {console.log(isLoggedIn === "true")}
                    {data && <User data={data} />}
                    {scores.length > 0 && <History scores={scores} />}
                </div>

            </>
        )

    }
    else {
        return (
            <>
                <NavBar />
                <div className={classes.main_container}>
                    {isLoggedIn === "false" && username === null && <h1>Please enter username in userInfo</h1>}

                    {stats.length > 0 && <New stats={stats} username={username} />}
                    {stats.length > 0 && <Stat stats={stats} />}

                </div>

            </>
        )
    }
}

export default Profile