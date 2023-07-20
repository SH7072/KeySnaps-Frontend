import { ActionIcon, Button, Checkbox, Flex, Input, MediaQuery, Paper, PasswordInput, Text, Title, createStyles } from '@mantine/core';
import { IconAt, IconBrandFacebook, IconBrandGoogle, IconBrandTwitter } from '@tabler/icons-react';
import React, { useState } from 'react';
import PasswordInputCustom from './PasswordInputCustom';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../../../Code-Editor-Frontend/src/redux/actions/user';


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


const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];


const Signup = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [checkedError, setCheckedError] = useState('');


    const handleValidation = () => {
        let isFormValid = true;
        if (firstName === '') {
            isFormValid = false;
            setFirstNameError('First Name is required');
        }
        else {
            setFirstNameError('');
        }
        if (lastName === '') {
            isFormValid = false;
            setLastNameError('Last Name is required');
        }
        else {
            setLastNameError('');
        }
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
            if (!requirements[0].re.test(password) || !requirements[1].re.test(password) || !requirements[2].re.test(password) || !requirements[3].re.test(password)) {
                isFormValid = false;
                setPasswordError('Password is not strong enough');
            }
            else {
                setPasswordError('');
            }
        }
        if (confirmPassword === '') {
            isFormValid = false;
            setConfirmPasswordError('Confirm Password is required');
        }
        else {
            if (passwordError === '' && password !== confirmPassword) {
                isFormValid = false;
                setConfirmPasswordError('Password and Confirm Password must match');
            }
            else {
                setConfirmPasswordError('');
            }
        }
        if (checked === false) {
            isFormValid = false;
            setCheckedError('Please accept the terms and conditions');
        }
        else {
            setCheckedError('');
        }

        return isFormValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleValidation()) {
            console.log(firstName, lastName, email, password, confirmPassword, checked);
            const name = firstName + ' ' + lastName;
            dispatch(register(name, email, password, navigate));
        }

    };

    return (
        <>
            <Paper sx={classes.body}>
                <Title order={1} align={'center'} sx={classes.logo}>CodeRoom</Title>
                <Flex w={'50%'} h={'100%'} justify={'center'} align={'center'}>
                    <img src="./login.png" alt="login" width="90%" height="90%" />
                </Flex>
                <Flex w={'50%'} h={'100%'} justify={'center'} align={'center'} >
                    < Paper p={10} miw={'60%'} maw={'60%'} w={'60%'}>
                        <Title order={1} align={'center'}>Create an account</Title>
                        <Text c="dimmed" align={'center'}>Enter your details below.</Text>
                        <Flex justify={'center'} align={'center'}>
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
                        <Flex py={15} px={20} direction='column' gap={20}>
                            <Flex justify={'space-between'}>
                                <Input.Wrapper
                                    label="First Name"
                                    required
                                    error={firstNameError}
                                >
                                    <Input
                                        placeholder="Your First Name"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.currentTarget.value)}
                                    />
                                </Input.Wrapper>
                                <Input.Wrapper label="Last Name" required error={lastNameError}>
                                    <Input
                                        placeholder="Your Last Name"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.currentTarget.value)}
                                    />
                                </Input.Wrapper>
                            </Flex>
                            <Input.Wrapper label="Email" required error={emailError} >
                                <Input
                                    icon={<IconAt />}
                                    placeholder="Your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </Input.Wrapper>
                            <PasswordInputCustom password={password} setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} requirements={requirements} />
                            <PasswordInput
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                                error={confirmPasswordError}
                            />
                            <Checkbox
                                label="I agree to sell my soul and privacy to this corporation"
                                required
                                checked={checked}
                                onChange={(event) => setChecked(event.currentTarget.checked)}
                                error={checkedError}
                            />
                            <Flex justify={'space-between'} mt={10}>
                                <Link to="/login" className={classes.link}>
                                    <Text align={'center'}>Already have an account? Login</Text>
                                </Link>
                                <Button color="blue" onClick={handleSubmit}>
                                    Register
                                </Button>
                            </Flex>
                        </Flex>

                    </Paper>
                </Flex >
            </Paper >
        </>

    )
}
export default Signup;
