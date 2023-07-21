import { Button, Flex, Input, Text, Title, createStyles } from "@mantine/core";
import { IconUserExclamation } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const useStyles = createStyles((theme) => ({
    text: {
        fontFamily: 'Roboto Mono',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'black',
        // textShadow: '0 0 10px black',
        paddingRight: '1rem'
    },
    heading: {
        fontFamily: 'Roboto Mono',
        fontSize: '5rem',
        fontWeight: '700',
        color: 'black',
        // textShadow: '0 0 10px black',
        // paddingRight: '1rem',
        // position: 'absolute',
        // top: 100
    }
}));

const UserInfo = () => {

    const { classes, theme } = useStyles();
    const [username, setUsername] = useState('{user}');
    const navigate = useNavigate();

    const handleStartTyping = () => {
        sessionStorage.setItem('username', username);
        navigate('/practice');
    }

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (username !== null) {
            setUsername(username);
            navigate('/practice');
        }

    }, []);


    return (
        <>
            <Flex align={'center'} justify={'center'} h={'100vh'} mih={'100vh'} direction={'column'}>
                <Title sx={classes.heading}>hey {username === '' ? "{user}" : username}!!!</Title>
                <Text sx={classes.text} >
                    {username === '{user}' ? 'What should we call you?' : 'Welcome to the world of typing!!!'}
                </Text>
                <Input
                    sx={{ width: '20rem', marginTop: '5rem' }}
                    value={username === '{user}' ? '' : username}
                    onChange={(e) => setUsername(e.target.value)}
                    icon={<IconUserExclamation />}
                    placeholder="Enter username"
                />
                <Flex mt={'2rem'} gap={'1rem'}>
                    <Button onClick={() => navigate('/home')}>
                        Back
                    </Button>
                    {(username === '{user}' || username === '') && <Button disabled>
                        Start Typing
                    </Button>}
                    {(username !== '{user}' && username !== '') && <Button onClick={handleStartTyping} >
                        Start Typing
                    </Button>}

                </Flex>

            </Flex>
        </>
    );
}

export default UserInfo;