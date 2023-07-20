import { Flex, SegmentedControl, Tooltip } from "@mantine/core";

const Timing = ({ startTime, setStartTime, setTime }) => {
    return (
        <>

            {console.log(startTime)}
            <Flex justify={'center'} w={'30vw'}>
                <Tooltip label="time">
                    <SegmentedControl
                        defaultValue="30"
                        radius={8}
                        value={toString(startTime)}
                        onChange={
                            (val) => {
                                console.log(Number(val));
                                setStartTime(Number(val));
                                setTime(Number(val));
                            }
                        }
                        data={[
                            { label: '90 sec', value: "90" },
                            { label: '60 sec', value: "60" },
                            { label: '30 sec', value: "30" },
                        ]}
                        h={'fit-content'}
                    />
                </Tooltip>
            </Flex>
        </>
    );
}

export default Timing;