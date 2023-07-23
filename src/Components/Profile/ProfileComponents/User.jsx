import { createStyles, Flex, Avatar } from "@mantine/core";

import React from 'react'


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
    profile_test: {
        width: "30%",
        height: "3rem",
        flexDirection: "column",
        justify: "center",
    },
    profile_time: {
        width: "20%",
        height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
    },
    announced_section_2: {
        width: '100%',
        marginTop: "1rem",
        marginLeft: "1rem",
    },
    profile_averageScore: {
        width: "59%",
        flexDirection: "column"
    },
    profile_overallScore: {
        width: "50%",
        flexDirection: "column"
    },

}));
const User = ({ data }) => {
    // const data = data;
    console.log(data);
    let totSec = data.totalTime;
    let dateObj = new Date(totSec * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    const timeString = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');
    const { classes, theme } = useStyles();
    const totalTest = data.scores.length;
    let speed = data.speed;
    speed = Math.round((speed + Number.EPSILON) * 100) / 100
    let Accuracy = data.accuracy;
    Accuracy = Math.round((Accuracy + Number.EPSILON) * 100) / 100
    return (
        <>

            <Flex className={classes.announced_card_container}>
                <Flex className={classes.announced_section_1}>
                    <Flex className={classes.profile_picture}><Avatar size={"2.5rem"}></Avatar></Flex>
                    <Flex className={classes.profile_name}>
                        <p>{data.username}</p>
                    </Flex>
                    <Flex className={classes.profile_test}>
                        <p>Test : {totalTest}</p>
                    </Flex>
                    <Flex className={classes.profile_time}>
                        <p>Total Time: {timeString} </p>
                    </Flex>
                </Flex>
                <Flex className={classes.announced_section_2}>
                    <Flex className={classes.profile_averageScore}>
                        <p>Average Speed: {speed} wpm</p>
                    </Flex>
                    <Flex className={classes.profile_overallScore}>
                        <p>Overall Accuracy: {Accuracy} %</p>
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}

export default User