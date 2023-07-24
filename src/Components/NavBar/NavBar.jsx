import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    Title,
    Flex,
    Menu,
} from '@mantine/core';
import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin,
    IconChevronDown,
    IconUser,
} from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {

    const navigate = useNavigate();
    const handleLogout = () => {
        
        sessionStorage.clear();
        navigate('/logout')
    }
    return (
        <>
            <Flex justify={'space-between'} p={'10px'}>
                <Title order={3} sx={{ color: 'black', fontFamily: 'Ubuntu Mono' }} onClick={() => navigate('/home')}>KeySnaps</Title>
                <Group m={0} pr={'10px'}>
                    <Menu>
                        <Menu.Target>
                            <Button variant="subtle"><IconUser /></Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => navigate('/profile')}>Profile</Menu.Item>
                            {/* <Menu.Item>Settings</Menu.Item> */}
                            <Menu.Item onClick={handleLogout} >Logout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Flex>

        </>
    );
}

export default NavBar;