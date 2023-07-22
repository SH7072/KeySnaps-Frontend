import { Flex, Paper, createStyles } from "@mantine/core";




const LobbyUI = () => {


    return (
        <>
            <>
                {/* <div>Lobby</div>
                <div>{lobbyCode}</div>
                <div>{multiPlayerUsername}</div>
                <div>
                    {announcements.map((announcement, index) => {
                        return (
                            <div key={index}>{announcement}</div>
                        )
                    })}
                </div>
                {multiPlayerUsername === lobbyInfo.ownerName && <Button onClick={handleGameStart}>Start Game</Button>}
                <Flex align={"center"} h={'70vh'} direction={'column'} pt={'100px'}>
                    {status === "stop" &&
                        (
                            <>
                                <Flex justify={'space-between'} w={'80%'}>
                                    <CountUp start={0} end={grossWPM} delay={0}>
                                        {({ countUpRef }) => (
                                            <StatsIcon
                                                label={"Gross WPM"}
                                                progress={grossWPM}
                                                icon={grossWPM > 50 ? "up" : "down"}
                                                countUpRef={countUpRef}
                                            />
                                        )}
                                    </CountUp>
                                    <CountUp start={0} end={netWPM} delay={0}>
                                        {({ countUpRef }) => (
                                            <StatsIcon
                                                label={"Net WPM"}
                                                progress={netWPM}
                                                icon={netWPM > 50 ? "up" : "down"}
                                                countUpRef={countUpRef}
                                            />
                                        )}
                                    </CountUp>
                                    <CountUp start={0} end={accuracy} delay={0}>
                                        {({ countUpRef }) => (
                                            <StatsIcon
                                                label={"Accuracy"}
                                                progress={accuracy}
                                                icon={accuracy > 85 ? "up" : "down"}
                                                countUpRef={countUpRef}
                                            />
                                        )}
                                    </CountUp>
                                </Flex>
                            </>
                        )
                    }
                    <Flex w="80vw" h={"50vh"} direction={'column'}>
                        {status === "start" && <Timer count={time} maxCount={startTime} />}
                        {status === "ready" && <Timer count={waitTime} maxCount={5} />}
                        {(pendingWords?.length > 0) && (status === "start") && <TypeWriter
                            doneWords={doneWords}
                            pendingWords={pendingWords}
                            handleKeyDown={handleKeyDown}
                            handleReset={handleReset}
                        />}
                    </Flex>
                    {
                        multiPlayerUsername === lobbyInfo.ownerName &&
                        <Flex justify={'center'} w="80vw" align={'center'} >
                            {status == 'wait' && <Difficulty difficulty={difficulty} setDiffculty={setDiffculty} />}

                            <Tooltip label="reset">
                                <IconKeyboard size={"100px"} onClick={handleReset} />
                            </Tooltip>

                            {status === 'wait' && <Timing startTime={startTime} setStartTime={setStartTime} setTime={setTime} />}

                        </Flex>
                    }
                </Flex> */}
            </>
        </>
    );
}

export default LobbyUI;