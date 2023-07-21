import { RingProgress, Text, createStyles } from "@mantine/core";
import { useEffect } from "react";


const useStyles = createStyles((theme) => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },
}));

const Timer = ({ count, maxCount, ...props }) => {

    const { classes, theme } = useStyles();

    return (
        <>
            <RingProgress
                {...props}
                roundCaps
                thickness={6}
                size={50}
                sections={[{ value: count * (100 / maxCount), color: theme.primaryColor }]}
                label={
                    <div>
                        <Text ta="center" fz="sm" className={classes.label}>
                            {count}
                        </Text>
                    </div>
                }
            />
        </>
    );
}

export default Timer;