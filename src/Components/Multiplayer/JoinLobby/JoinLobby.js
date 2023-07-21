import { TextInput, Checkbox, Button, Group, Box, Flex, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router';


const JoinLobby = () => {

    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    const [username, setUsername] = useState(isLoggedIn === 'true' ? sessionStorage.getItem('username') : '');
    const [lobbyCode, setLobbyCode] = useState(null);

    const naviagte = useNavigate();

    const handleSubmit = async () => {
        console.log('submit');
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lobby/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username: username, lobbyCode: lobbyCode, isLoggedIn: isLoggedIn })
            });
            const status = res.status;
            const data = await res.json();

            if (status === 200) {
                console.log(data.lobby);
                sessionStorage.setItem('multiPlayerUsername', username);
                naviagte(`/lobby/${data.lobby.lobbyCode}`);
            }
            else {
                throw new Error(data.message);
            }
        }
        catch (error) {
            console.log(error, "error");
        }
    }

    return (

        <Flex maw={300} mx="auto" direction={'column'} justify={'center'}>
            <Tooltip label="Username can't be changed" disabled={!(isLoggedIn === 'true')}>
                <Box mb="md" >
                    <TextInput
                        withAsterisk
                        label="Username"
                        placeholder="username"
                        disabled={isLoggedIn === 'true'}
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
            </Tooltip >
            <TextInput
                withAsterisk
                label="Lobby Code"
                placeholder="Enter a active lobby code"
                required
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
            />


            <Group position="right" mt="md">
                <Button onClick={handleSubmit}>Join Lobby</Button>
            </Group>
        </Flex >
    );
}

export default JoinLobby;