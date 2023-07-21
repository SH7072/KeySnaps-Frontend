import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../../socket";
import { Button, Flex, Tooltip } from "@mantine/core";
import TypeWriter from "../TypeWriter/TypeWriter";
import Difficulty from "../TypeWriter/Diffculty";
import Timing from "../TypeWriter/Timing";
import { IconKeyboard } from "@tabler/icons-react";
import Progress from "../TypeWriter/Progress";
import Timer from "./Timer";
import CountUp from 'react-countup';
import StatsIcon from "../TypeWriter/StatsIcon";

const modes = {
    easy: 'getEasyMode',
    medium: 'getMediumMode',
    hard: 'getHardMode'
}


const Lobby = () => {

    const { lobbyCode } = useParams();
    const multiPlayerUsername = sessionStorage.getItem('multiPlayerUsername');
    const multiPlayerUserid = sessionStorage.getItem('multiPlayerUserid');
    const [announcements, setAnnouncements] = useState([]);

    const [lobbyInfo, setLobbyInfo] = useState({});
    const [startTime, setStartTime] = useState(10);
    const [difficulty, setDiffculty] = useState('easy');
    const [doneWords, setDoneWords] = useState([]);
    const [pendingWords, setPendingWords] = useState("");
    const [status, setStatus] = useState('wait');
    const [stats, setStats] = useState({ inputChars: 0, goodChars: 0 });
    const [time, setTime] = useState(startTime);
    const [grossWPM, setGrossWPM] = useState(0);
    const [netWPM, setNetWPM] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [waitTime, setWaitTime] = useState(5);

    const getLobbyInfo = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/lobby/getLobby/${lobbyCode}/`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data);
        setLobbyInfo(data.data);
    }
    const fetchParagraph = async () => {
        const mode = modes[difficulty];
        const url = `${process.env.REACT_APP_BACKEND_URL}/paragraph/${mode}/`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data['data']);
        setPendingWords(data['data']);
        return data['data'];
    }

    const handleKeyDown = (e) => {


        if (e.keyCode !== 8) {
            if (e.keyCode !== 16) { // If the pressed key is anything other than SHIFT
                if ((e.keyCode >= 65 && e.keyCode <= 90) ||
                    (e.keyCode >= 97 && e.keyCode <= 122) ||
                    e.keyCode === 32 || e.keyCode === 188 || e.keyCode === 190 || e.keyCode === 219 || e.keyCode === 221 || e.keyCode === 222) {

                    // if (status === 'wait') setStatus('start');
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
        setPendingWords("")
        setDiffculty(difficulty)
        setStatus('wait')
        setStats({ inputChars: 0, goodChars: 0 })
        setTime(startTime)
        setWaitTime(5)
        setGrossWPM(0)
        setNetWPM(0)
        setAccuracy(0)
    }

    console.log(announcements);

    useEffect(() => {
        socket.on('announcement', (msg) => {
            console.log(msg);
            console.log(announcements);
            setAnnouncements([...announcements, msg]);
        });

        socket.on('game-ready', (data) => {
            setStartTime(data.startTime);
            setWaitTime(data.waitTime);
            setTime(data.startTime);
            setPendingWords(data.paragraph);
            setDiffculty(data.difficulty);
            setStatus('ready');
        });

    }, [socket]);

    useEffect(() => {
        getLobbyInfo();
        socket.connect();
        // console.log(lobbyCode, multiPlayerUsername);
        socket.emit('player-joined', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername });


    }, []);

    useEffect(() => {
        const timerId = time > 0 && status === 'start' && setInterval(() => {
            setTime(time - 1);
            setAccuracy(calcAccuracy());
            setGrossWPM(calulateGrossWPM());
            setNetWPM(calulateNetWPM());
        }, 1000);
        const timerId2 = time === 0 && status === 'start' && handleTypingEnd();

        const timerId3 = waitTime > 0 && status === 'ready' && setInterval(() => {
            setWaitTime(waitTime - 1);
        }, 1000);

        const timerId4 = waitTime === 0 && status === 'ready' && setStatus('start');

        return () => {
            clearInterval(timerId);
            clearInterval(timerId3);
        }

    }, [time, status, waitTime]);

    const handleGameStart = async () => {
        const paragraph = await fetchParagraph();
        socket.emit('start-game', {
            lobbyCode,
            waitTime: waitTime,
            startTime: startTime,
            difficulty: difficulty,
            paragraph: paragraph
        });
        setStatus('ready');
    }

    const handleTypingEnd = () => {
        setStatus('stop');
        handleReset();
        socket.emit('end-game', { lobbyCode, userid: multiPlayerUserid, username: multiPlayerUsername, stats: { grossWPM, netWPM, accuracy, time, difficulty } });
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
            <div>Lobby</div>
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
            </Flex>
        </>
    )
}

export default Lobby;