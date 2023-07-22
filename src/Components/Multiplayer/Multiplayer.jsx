import React, { useState, useEffect } from 'react'
import { createStyles, Flex, Box, Text, Anchor, Button } from "@mantine/core";



const useStyles = createStyles((theme) => ({
    main_container: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        backgroundColor: 'white',
        width: '85vw',
        margin: "0 auto",
        padding: '2rem 1rem 1rem 1rem',
    },
    container1: {
        backgroundColor: "white",
        width: "40%",
        marginRight: "1rem",
        margin: "1rem",
        marginLeft: "0rem",
        // textAlign: "center",
        flexDirection: "column",
    },
    container2: {
        backgroundColor: "white",
        width: "60%",
        margin: "1rem",
        marginRight: "0rem",
        flexDirection: "row",

    },
    text_c: {
        width: "100%",
        height:"12rem",
        flexDirection: "row",
        justifyContent: "center",
        textAlign:"center"
        
    },
    createLobby: {
        width: "100%",
        height: "3rem",
        flexDirection: "column  ",
        justifyContent: "center",
        alignItems:"center  ",
        
    },
    joinLobby: {
        width: "100%",
        height: "3rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center  ",

    }
}));



const Multiplayer = () => {

    const { classes, theme } = useStyles();

    return (
        <>
            <div className={classes.main_container}>
                <Flex className={classes.container1}>
                    <Flex className={classes.text_c}>

                        <Text>
                            With every keysnap, the symphony of words comes alive. Embrace the rhythm of typing, where each stroke is a note in the masterpiece of your expression.
                        </Text>
                    </Flex>
                    <Flex className={classes.createLobby}>
                        <Button >
                            Create Lobby
                        </Button>
                    </Flex>

                    <Flex  className={classes.joinLobby}>
                    <Button >
                            Join Lobby
                        </Button>
                    </Flex>
                </Flex>

                <Flex className={classes.container2}>

                </Flex>
            </div>
        </>
    )
}

export default Multiplayer
