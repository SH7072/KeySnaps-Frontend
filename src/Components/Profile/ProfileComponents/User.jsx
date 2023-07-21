import { createStyles, Button, Flex, Avatar, TextInput, Menu } from "@mantine/core";

import React from 'react'
import { BsThreeDotsVertical, BsPeopleFill } from 'react-icons/bs';
import { TbArrowBigRight } from 'react-icons/tb';




const useStyles = createStyles((theme) => ({
    announced_card_container: {
        marginTop: "1rem",
        backgroundColor: "white",

        width: '100%',
        // boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        borderRadius: "8px",
        border: "2px solid rgb(218, 220, 224)",

        // alignItems: "center",
        flexDirection: "column",
    },
    announced_section_1: {
        width: '100%',
        marginTop: "1rem",
    },
    profile_picture: {
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        height: "3rem",
    },
    profile_name: {
        width: "40%",

        height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
    },
    profile_test:{
        width: "30%",
        height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
    },
    profile_time:{
        width: "20%",
        height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
    },

}));
const User = () => {
    const { classes, theme } = useStyles();
    
    return (
        <Flex className={classes.announced_card_container}>
            <Flex className={classes.announced_section_1}>
                <Flex className={classes.profile_picture}><Avatar size={"2.5rem"}></Avatar></Flex>
                <Flex className={classes.profile_name}>
                    <p>killmach</p>
                </Flex>
                <Flex className={classes.profile_test}>
                    <p>Test</p>
                </Flex>
                <Flex className={classes.profile_time}>
                    <p>Total Time</p>
                </Flex>
            </Flex>
        </Flex>

    )
}

export default User