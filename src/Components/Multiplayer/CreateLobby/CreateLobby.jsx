
import { TextInput, Checkbox, Button, Group, Box, Tooltip, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const CreateLobby = () => {

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  const [username, setUsername] = useState(isLoggedIn === 'true' ? sessionStorage.getItem('username') : '');
  const [isPublic, setIsPublic] = useState(false);

  const naviagte = useNavigate();



  const handleSubmit = async () => {
    console.log('submit');
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lobby/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, isPublic: isPublic, isLoggedIn: isLoggedIn })
      });
      const status = res.status;
      const data = await res.json();

      if (status === 200) {
        console.log(data.lobby);
        sessionStorage.setItem('multiPlayerUsername', username);
        sessionStorage.setItem('multiPlayerUserid', data.userid);
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
    <>
      <Tooltip label="Username can't be changed" disabled={!(isLoggedIn === 'true')}>
        <Flex maw={300} mx="auto" direction={'column'} justify={'center'}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="username"
            required
            disabled={isLoggedIn === 'true'}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Flex justify={'space-between'} align={'center'} mt={'5px'}>
            <Checkbox
              label="Private Room"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.currentTarget.checked)}
              mb={'10px'}
            />

            <Button onClick={handleSubmit}>Create Lobby</Button>
          </Flex>
        </Flex >
      </Tooltip>
    </>
  );
}


export default CreateLobby;