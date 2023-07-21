import { TextInput, Checkbox, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router';


const JoinLobby = () => {
    const [username, setUsername] = useState('');
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
                body: JSON.stringify({ username: username, lobbyCode: lobbyCode })
            });
            const status = res.status;
            const data = await res.json();

            if (status === 200) {
                console.log(data.data);
                sessionStorage.setItem('multiPlayerUsername', username);
                naviagte(`/lobby/${data.data.lobbyCode}`);
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
        <Box maw={300} mx="auto">
            <TextInput
                withAsterisk
                label="Username"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextInput
                withAsterisk
                label="Lobby Code"
                placeholder="Enter a active lobby code"
                required
                value={lobbyCode}
                onChange={(e) => setLobbyCode(e.target.value)}
            />


            <Group position="right" mt="md">
                <Button onClick={handleSubmit}>Submit</Button>
            </Group>
        </Box>
    );
}

export default JoinLobby;