import { Flex, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },
    border: {
        border: '1px solid black'
    }

}));


const LobbyUI = () => {

    const { classes, theme } = useStyles();

    return (
        <>
            <Flex w={'100vw'} h={'100vh'} sx={classes.border} direction={'column'}>
                <Flex mih={'50%'} sx={classes.border}>
                    <Flex miw={'75%'} sx={classes.border}>

                    </Flex>
                    <Flex miw={'25%'} sx={classes.border}>

                    </Flex>
                </Flex>
                <Flex mih={'50%'} sx={classes.border}>
                    <Flex miw={'75%'} sx={classes.border}>

                    </Flex>
                    <Flex miw={'75%'} sx={classes.border}>

                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}

export default LobbyUI;