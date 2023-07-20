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
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <Flex justify={'space-between'} p={'10px'}>
                <Title order={3} style={{ color: 'black' }}>KeySnaps</Title>
                <Group m={0} pr={'10px'}>
                    <Menu>
                        <Menu.Target>
                            <Button variant="subtle"><IconUser /></Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>Profile</Menu.Item>
                            <Menu.Item>Settings</Menu.Item>
                            <Menu.Item>Logout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Flex>

        </>
    );
}

export default NavBar;