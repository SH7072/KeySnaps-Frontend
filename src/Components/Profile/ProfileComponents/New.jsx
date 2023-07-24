import { createStyles, Flex, Avatar } from "@mantine/core";
import React from 'react';
import Cards from "./Cards";


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
        paddingLeft:"0.5rem",
    },
    profile_picture: {
        width: "35%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "5rem",
        flexDirection: "column",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",


    },
    profile_test: {
        width: "35%",
        // height: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingLeft:"0.5rem",
        paddingRight: "0.5rem",

    },
    profile_time: {
        width: "35%",
        // height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
        paddingRight: "0.5rem",

    },
    announced_section_2: {
        width: '100%',
        marginTop: "1rem",
        marginLeft: "1rem",
        paddingBottom: "0.5rem",
        justifyContent: "space-around"

    },
    profile_averageScore: {
        width: "35%",
        flexDirection: "column",
        alignItems: "center",
        // paddingRight:"1.5rem",
    },
    profile_overallScore: {
        width: "35%",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // paddingRight:"0.5rem",
    },

}));

const New = ({ username, stats }) => {
    const { classes, theme } = useStyles();
    console.log(username);
    console.log(stats);
    const test = stats.length;
    

    const subjectTotals = stats.reduce((acc, subject) => {
        Object.keys(subject).forEach((subjectName) => {
            acc[subjectName] = (acc[subjectName] || 0) + parseInt(subject[subjectName]);
        });
        return acc;
    }, {});

    let totaltime = subjectTotals.time;
    let overallAccuracy = subjectTotals.accuracy / test;
    let averageSpeed = subjectTotals.netWPM / test;
    console.log(averageSpeed);
    console.log(overallAccuracy);
    let dateObj = new Date(totaltime * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    const timeString = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');


    averageSpeed = Math.round((averageSpeed + Number.EPSILON) * 100) / 100
    overallAccuracy = Math.round((overallAccuracy + Number.EPSILON) * 100) / 100
    // console.log(timeString);
    // console.log(overallAccuracy);
    //  console.log(averageSpeed);


    return (
        <>
            <Flex className={classes.announced_card_container}>
                <Flex className={classes.announced_section_1}>

                    <Flex className={classes.profile_name}>
                        <Cards label={username}
                            // progress={100}
                            icon={"user"}
                        />
                        {/* <p>{username} </p> */}
                    </Flex>
                    <Flex className={classes.profile_test}>
                        <Cards label={"Total Tests"}
                            // progress={100}
                            icon={"down"}
                            countUpRef={test}
                        />
                        {/* <p>Test : {test}</p> */}
                    </Flex>
                    <Flex className={classes.profile_time}>
                        <Cards label={"Total Time"}
                            // progress={100}
                            icon={"time"}
                            countUpRef={timeString}
                        />
                        {/* <p>Total Time: {timeString} </p> */}
                    </Flex>
                </Flex>
                <Flex className={classes.announced_section_2}>
                    <Flex className={classes.profile_averageScore}>
                        <Cards label={"Average Speed"}
                            // progress={100}
                            icon={"speed"}
                            countUpRef={averageSpeed}
                        />
                        {/* <p>Average Speed: {averageSpeed} wpm</p> */}
                    </Flex>
                    <Flex className={classes.profile_overallScore}>
                        <Cards label={"Overall Accuracy"}
                            // progress={100}
                            icon={"accuracy"}
                            countUpRef={overallAccuracy}
                        />
                        {/* <p>Overall Accuracy: {overallAccuracy} %</p> */}
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default New