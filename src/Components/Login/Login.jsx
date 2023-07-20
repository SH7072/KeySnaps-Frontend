import { ActionIcon, Button, Flex, Input, Paper, PasswordInput, Text, Title, createStyles } from '@mantine/core';
import { IconAt, IconBrandFacebook, IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    body: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e8bb17',
        height: '100vh',
        width: '100vw',
    },
    link: {
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
    },
    logo: {
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '0.1rem',
        textShadow: '0 0 1rem rgba(0,0,0,0.5)',
        position: 'absolute',
        top: '1rem',
        left: '1rem',
    }
}));


const Login = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState('');

    const handleValidation = (e) => {
        let isFormValid = true;
        if (email === '') {
            isFormValid = false;
            setEmailError('Email is required');
        }
        else {
            if (!/\S+@\S+\.\S+/.test(email)) {
                isFormValid = false;
                setEmailError('Email is invalid');
            }
            else {
                setEmailError('');
            }
        }
        if (password === '') {
            isFormValid = false;
            setPasswordError('Password is required');
        }
        else {
            setPasswordError('');
        }

        return isFormValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            try {

                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                const status = res.status;
                const data = await res.json();

                if (status === 200) {
                    localStorage.setItem('token', data.token);
                    navigate('/home');
                }
                else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.log(error, "error");
                setFormError(error.message);
            }
        }
    };


    return (
        <>
            <Paper sx={classes.body}>
                <Title order={1} align={'center'} sx={classes.logo}>Login</Title>
                <Flex w={'50%'} h={'100%'} justify={'center'} align={'center'}>
                    {/* <img src="./login.png" alt="login" width="90%" height="90%" /> */}
                </Flex>
                <Flex w={'50%'} h={'100%'} justify={'center'} align={'center'} >
                    <Paper w={'60%'} p={10}>
                        <Title order={1} align={'center'}>Log In</Title>
                        <Flex justify={'center'} align={'center'} mt={15}>
                            <ActionIcon variant="outline" color="blue" radius="xl" size="xl" style={{ margin: 'auto' }}>
                                <IconBrandGoogle />
                            </ActionIcon>
                            <ActionIcon variant="outline" color="blue" radius="xl" size="xl" style={{ margin: 'auto' }}>
                                <IconBrandFacebook />
                            </ActionIcon>
                            <ActionIcon variant="outline" color="blue" radius="xl" size="xl" style={{ margin: 'auto' }}>
                                <IconBrandTwitter />
                            </ActionIcon>
                        </Flex>
                        {formError && (
                            <Text color="red" align="center" mt={10}>
                                {formError}
                            </Text>
                        )}
                        <Flex py={15} px={20} direction='column' gap={20}>
                            <Input.Wrapper label="Email" required error={emailError} >
                                <Input
                                    icon={<IconAt />}
                                    placeholder="Your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </Input.Wrapper>
                            <PasswordInput
                                label="Password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                error={passwordError}
                            />
                            <Flex justify={'space-between'} mt={10}>
                                <Link to="/signup" className={classes.link}>
                                    <Text align={'center'}>Don't have an account? Register</Text>
                                </Link>
                                <Button color="blue" onClick={handleSubmit}>
                                    Login
                                </Button>
                            </Flex>
                        </Flex>

                    </Paper>
                </Flex >
            </Paper >
        </>

    )
}
export default Login;