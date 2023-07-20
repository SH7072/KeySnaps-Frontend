import { Box, Center, Flex, SegmentedControl, Tooltip } from "@mantine/core";
import TypeWriter from "../TypeWriter/TypeWriter";
import NavBar from "../NavBar/NavBar";
import { IconClockHour3, IconHash, IconKeyboard } from "@tabler/icons-react";
import Options from "../Options";
import { useEffect, useState } from "react";
import Timer from "../TypeWriter/Progress";
import CountUp from 'react-countup';
import Progress from "../TypeWriter/Progress";
import StatsIcon from "../TypeWriter/StatsIcon";
import Timing from "../TypeWriter/Timing";
import Difficulty from "../TypeWriter/Diffculty";

const Practice = ({ }) => {
    const [startTime, setStartTime] = useState(10);
    const [difficulty, setDiffculty] = useState('easy');
    const [doneWords, setDoneWords] = useState([]);
    const [pendingWords, setPendingWords] = useState("there is no specific topic provided, so it is difficult to generate a paragraph without any context. Please provide a topic or let me know if there's anything else I can assist you with. People of all ages and cultures respond to humour. Most people are able to experience humour—be amused, smile or laugh at something funny(such as a pun or joke)—and thus are considered to have a sense of humour. The hypothetical person lacking a sense of humour would likely find the behaviour to be inexplicable, strange, or even irrational.");
    const [status, setStatus] = useState('wait');
    const [stats, setStats] = useState({ inputChars: 0, goodChars: 0 });
    const [time, setTime] = useState(startTime);
    const [grossWPM, setGrossWPM] = useState(0);
    const [netWPM, setNetWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(0);


    console.log(startTime, difficulty);
    // console.log(time, status, stats, grossWPM, netWPM, accuracy);

    useEffect(() => {
        const timerId = time > 0 && status === 'start' && setInterval(() => {
            setTime(time - 1);
        }, 1000);
        const timerId2 = time === 0 && status === 'start' && setStatus('stop');

        return () => {
            clearInterval(timerId);
            setAccuracy(calcAccuracy());
            setGrossWPM(calulateGrossWPM());
            setNetWPM(calulateNetWPM());
        }

    }, [time, status]);

    const handleKeyDown = (e) => {


        if (e.keyCode !== 8) {
            if (e.keyCode !== 16) { // If the pressed key is anything other than SHIFT
                if ((e.keyCode >= 65 && e.keyCode <= 90) ||
                    (e.keyCode >= 97 && e.keyCode <= 122) ||
                    e.keyCode === 32 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 219 || e.keyCode === 221 || e.keyCode === 222) {

                    if (status === 'wait') setStatus('start');
                    let newStats = { ...stats };

                    console.log(e.key, pendingWords[0]);

                    if (pendingWords[0] === e.key) {

                        newStats.inputChars++;
                        newStats.goodChars++
                        let newVal = pendingWords.substring(1);
                        setPendingWords(newVal);
                        if (e.keyCode === 32) {
                            setDoneWords([...doneWords, { letter: ' ', correct: true }]);
                        }
                        else {
                            setDoneWords([...doneWords, { letter: e.key, correct: true }]);
                        }
                    } else {
                        newStats.inputChars++;
                        setDoneWords([...doneWords, { letter: pendingWords[0], correct: false }]);
                        let newVal = pendingWords.substring(1);
                        setPendingWords(newVal);
                    }
                    setStats(newStats);
                }
            }
        } else {
            let newStats = { ...stats };
            if (doneWords.length > 0) {
                newStats.inputChars++;
                setPendingWords(doneWords[doneWords.length - 1].letter + pendingWords);
                setDoneWords(doneWords.slice(0, -1));
            }
            setStats(newStats);
        }
    }

    const handleReset = () => {
        setDoneWords([])
        setPendingWords("there is no specific topic provided, so it is difficult to generate a paragraph without any context. Please provide a topic or let me know if there's anything else I can assist you with. People of all ages and cultures respond to humour. Most people are able to experience humour—be amused, smile or laugh at something funny(such as a pun or joke)—and thus are considered to have a sense of humour. The hypothetical person lacking a sense of humour would likely find the behaviour to be inexplicable, strange, or even irrational.")
        setStatus('wait')
        setStats({ inputChars: 0, goodChars: 0 })
        setTime(startTime)
        setGrossWPM(0)
        setNetWPM(0)
        setAccuracy(0)
    }


    const calulateGrossWPM = () => {
        return (60 * (stats.inputChars) / (5 * startTime)).toFixed(2);
    }

    const calulateNetWPM = () => {
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        return ((60 * (Number((stats.inputChars / 5)) - (uncorrectedErrors))) / (startTime)).toFixed(2);
    }


    const calcAccuracy = () => {
        // return ((calulateNetWPM() / calulateGrossWPM()) * 100).toFixed(0);
        let uncorrectedErrors = 0;
        doneWords && doneWords.forEach((letter) => {
            if (!letter.correct) uncorrectedErrors++;
        });

        return (((stats.inputChars - uncorrectedErrors) / stats.inputChars) * 100).toFixed(0);
    }


    return (
        <>
            <NavBar />
            <Flex align={"center"} h={'70vh'} direction={'column'} pt={'100px'}>
                {status === "stop" &&
                    (
                        <>
                            <Flex justify={'space-between'} w={'80%'}>
                                <CountUp start={0} end={grossWPM} delay={2}>
                                    {({ countUpRef }) => (
                                        <StatsIcon
                                            label={"Gross WPM"}
                                            progress={grossWPM}
                                            icon={grossWPM > 50 ? "up" : "down"}
                                            countUpRef={countUpRef}
                                        />
                                    )}
                                </CountUp>
                                <CountUp start={0} end={netWPM} delay={2}>
                                    {({ countUpRef }) => (
                                        <StatsIcon
                                            label={"Net WPM"}
                                            progress={netWPM}
                                            icon={netWPM > 50 ? "up" : "down"}
                                            countUpRef={countUpRef}
                                        />
                                    )}
                                </CountUp>
                                <CountUp start={0} end={accuracy} delay={2}>
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
                    {status === "start" && <Progress count={time} />}
                    {(status === "wait" || status === "start") && <TypeWriter
                        doneWords={doneWords}
                        pendingWords={pendingWords}
                        handleKeyDown={handleKeyDown}
                        handleReset={handleReset}
                    />}
                </Flex>
                <Flex justify={'center'} w="80vw" align={'center'} >
                    {status == 'wait' && <Difficulty difficulty={difficulty} setDiffculty={setDiffculty} />}

                    <Tooltip label="reset">
                        <IconKeyboard size={"100px"} onClick={handleReset} />
                    </Tooltip>

                    {status === 'wait' && <Timing startTime={startTime} setStartTime={setStartTime} setTime={setTime} />}

                </Flex>
            </Flex>
        </>
    );
}

export default Practice;