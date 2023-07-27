import { RingProgress, Text, Paper, Center, createStyles } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

const icons = {
    up: IconArrowUpRight,
    down: IconArrowDownRight,
};

const useStyles = createStyles((theme) => ({
    count: {
        fontFamily: theme.fontFamily,
        fontWeight: 700,
        fontSize: "25px",
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justify: 'space-between',
        textAlign: 'center',
        borderRadius: theme.radius.md,
        // borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
        // borderColor: theme.colorScheme === 'dark' ? theme.colors.primaryBrand3[3] : theme.colors.gray[2],
        height: "100px",
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.primaryBrand3[5] : theme.colors.primaryBrand3[8],
        transition: 'box-shadow 150ms ease, transform 100ms ease',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.05)',
        }
    }
}));


const StatsIcon = ({ label, stats = 0, progress, icon = "up", countUpRef }) => {

    const { classes, theme } = useStyles();
    const Icon = icons[icon];
    return (
        <>
            <Paper withBorder radius="md" p="xs" w={"300px"} sx={classes.paper}>
                {/* <Group> */}
                <RingProgress
                    size={80}
                    roundCaps
                    thickness={8}
                    sections={[{ value: progress, color: theme.primaryColor }]}
                    label={
                        <Center>
                            <Icon size="1.4rem" stroke={1.5} />
                        </Center>
                    }
                />

                <div>
                    <Text size="25px" transform="uppercase" weight={700} ff={"robot mono"}>
                        {label}
                    </Text>
                    {/* <Text weight={700} size="xl" ref={countUpRef} /> */}
                    <span ref={countUpRef} className={classes.count} />
                    {label === "Accuracy" && <span>%</span>}
                </div>
                {/* </Group> */}
            </Paper>
        </>
    );
}

export default StatsIcon;