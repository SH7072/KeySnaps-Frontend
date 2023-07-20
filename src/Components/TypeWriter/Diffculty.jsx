import { Flex, SegmentedControl, Tooltip } from "@mantine/core";

const Difficulty = ({ difficulty, setDiffculty }) => {
    return (
        <>
            <Flex justify={'center'} w={'30vw'}>
                <Tooltip label="difficulty">
                    <SegmentedControl
                        defaultValue="easy"
                        radius={8}
                        value={difficulty}
                        onChange={setDiffculty}
                        data={[
                            { label: 'Hard', value: 'hard' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Easy', value: 'easy' },
                        ]}
                        h={'fit-content'}
                    />
                </Tooltip>
            </Flex>
        </>
    );
}

export default Difficulty;