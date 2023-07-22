import { RingProgress, Text, createStyles } from "@mantine/core";
import { useEffect } from "react";


const useStyles = createStyles((theme) => ({
    label: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 700,
        lineHeight: 1,
    },
}));

const RunningMeter = ({ count, accuracy, ...props }) => {

    const { classes, theme } = useStyles();

    console.log(count);

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
                            {count == "Infinity" ? "" : count} {accuracy ? "%" : "WPM"}
                        </Text>
                    </div>
                }
            />
        </>
    );
}

export default RunningMeter;