import { Flex, Text, createStyles } from "@mantine/core";
import { IconDeviceGamepad2, IconKeyboard, IconListNumbers, IconLogin, IconTargetArrow, IconWritingSign } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from 'typewriter-effect';


const useStyles = createStyles((theme) => ({
    text: {
        fontFamily: 'Ubuntu Mono',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'black',
        textShadow: '0 0 10px black',
        paddingRight: '1rem'
    },
    heading: {
        fontFamily: 'Ubuntu Mono',
        fontSize: '5rem',
        fontWeight: '700',
        color: 'black',
        textShadow: '0 0 10px black',
        paddingRight: '1rem',
        width: '100px',
        position: 'relative',
        left: '50px',
        bottom: '100px'

    }
}));


const Home = () => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const { classes } = useStyles();
    const naviagte = useNavigate();

    const handleLogout = () => {
        console.log('sjdius');
        sessionStorage.clear();
    }
    console.log(isLoggedIn);
    console.log(typeof isLoggedIn);

    return (
        <>
            <Flex h={'100vh'} w={'100vw'} mt={'50px'}>
                <Flex direction={'column'} w={'50%'} ml={'25vw'} pt={"200px"}>
                    <Flex size={'2rem'} onClick={() => naviagte('/userInfo')}>
                        <Text sx={classes.text} >
                            Practice
                        </Text>
                        <IconKeyboard size={'2rem'} />
                    </Flex>
                    <Flex size={'2rem'} onClick={() => naviagte('/lobby')}>
                        <Text sx={classes.text}>
                            MultiPlayer Typing Race
                        </Text>
                        <IconDeviceGamepad2 />
                    </Flex>
                    <Flex size={'2rem'} onClick={() => naviagte('/leaderboard')}>
                        <Text sx={classes.text}>
                            LeaderBoard
                        </Text>
                        <IconListNumbers />
                    </Flex>
                    <Flex size={'2rem'} onClick={() => naviagte('/profile')}>
                        <Text sx={classes.text}>
                            Profile
                        </Text>
                        <IconTargetArrow />
                    </Flex>
                    {
                        (isLoggedIn === 'false' || isLoggedIn === null) ? (
                            <>
                                <Flex size={'2rem'} onClick={() => naviagte('/login')}>
                                    <Text sx={classes.text}>
                                        Login
                                    </Text>
                                    <IconLogin />
                                </Flex>
                                <Flex size={'2rem'} onClick={() => naviagte('/register')}>
                                    <Text sx={classes.text}>
                                        Register
                                    </Text>
                                    <IconWritingSign />
                                </Flex>
                            </>
                        ) :
                            (
                                <>
                                    <Flex size={'2rem'} onClick={handleLogout}>
                                        <Text sx={classes.text}>
                                            Logout
                                        </Text>
                                        <IconLogin />
                                    </Flex>
                                </>
                            )
                    }
                </Flex>
                <Flex direction={'column'} w={'50%'} mr={'25vw'} pt={"200px"}>
                    <Text sx={classes.heading} >
                        <Typewriter
                            options={{
                                strings: ['Welcome To KeySnaps...'],
                                autoStart: true,
                                loop: true,
                                pauseFor: 10000,
                            }}
                        />
                    </Text>
                </Flex>
            </Flex >
        </>
    );
}

export default Home;