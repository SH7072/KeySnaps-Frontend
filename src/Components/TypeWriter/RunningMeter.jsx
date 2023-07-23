import { RingProgress, Text, createStyles } from "@mantine/core";
import { useEffect } from "react";


const useStyles = createStyles((theme) => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },
}));

const RunningMeter = ({ count, label, ...props }) => {

    const { classes, theme } = useStyles();
    return (
        <>
            <RingProgress
                {...props}
                roundCaps
                thickness={6}
                size={100}
                sections={[{ value: count, color: theme.primaryColor }]}
                label={
                    <div>
                        <Text ta="center" fz="md" className={classes.label}>
                            {count == "Infinity" ? "" : count} {label === "accuracy" && "%"}
                        </Text>
                        <Text ta="center" fz="xs" color="gray">
                            {label}
                        </Text>
                    </div>
                }
            />
        </>
    );
}

export default RunningMeter;