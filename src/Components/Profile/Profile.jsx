import React, { useState, useEffect } from 'react'
import { createStyles, Button, Flex, Menu } from "@mantine/core";
import User from './ProfileComponents/User';
import History from './ProfileComponents/History';


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

    const fetchUser = async () => {
        const userId = localStorage.getItem('userId')
        console.log(userId);
        const url = `${process.env.REACT_APP_BACKEND_URL}/getUser/${userId}`
        //
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const status = res.status;
            console.log(status);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { fetchUser() }, [])

    return (
        <div className={classes.main_container}>
            <User />
            <History/>
        </div>
    )
}

export default Profile