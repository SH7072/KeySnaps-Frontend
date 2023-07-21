import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../../socket";
import { Button, Flex, Progress, Tooltip } from "@mantine/core";
import TypeWriter from "../TypeWriter/TypeWriter";
import Difficulty from "../TypeWriter/Diffculty";
import Timing from "../TypeWriter/Timing";
import { IconKeyboard } from "@tabler/icons-react";

const modes = {
    easy: 'getEasyMode',
    medium: 'getMediumMode',
    hard: 'getHardMode'
}


const Lobby = () => {

    const { lobbyCode } = useParams();
    const multiPlayerUsername = sessionStorage.getItem('multiPlayerUsername');
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


    const getLobbyInfo = async () => {
        const url = `${process.env.REACT_APP_BACKEND_URL}/lobby/getLobby/${lobbyCode}/`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setLobbyInfo(data.data);
    }
    const fetchParagraph = async () => {
        const mode = modes[difficulty];
        console.log(mode);
        const url = `${process.env.REACT_APP_BACKEND_URL}/paragraph/${mode}/`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data['data']);
        setPendingWords(data['data']);
    }

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
        // setPendingWords("")
        setDiffculty(difficulty)
        setStatus('wait')
        setStats({ inputChars: 0, goodChars: 0 })
        setTime(startTime)
        setGrossWPM(0)
        setNetWPM(0)
        setAccuracy(0)
    }


    useEffect(() => {
        socket.on('announcement', (msg) => {
            console.log(msg);
            setAnnouncements([...announcements, msg]);
        });

        socket.on('start-game', () => {
            setStatus('start');
        }
        );

    }, [socket]);

    console.log(announcements);

    useEffect(() => {
        getLobbyInfo();
        socket.connect();
        // console.log(lobbyCode, multiPlayerUsername);
        socket.emit('player-joined', { lobbyCode, username: multiPlayerUsername });




    }, []);

    useEffect(() => {
        const timerId = time > 0 && status === 'start' && setInterval(() => {
            setTime(time - 1);
            setAccuracy(calcAccuracy());
            setGrossWPM(calulateGrossWPM());
            setNetWPM(calulateNetWPM());
        }, 1000);
        const timerId2 = time === 0 && status === 'start' && handleTypingEnd();

        return () => {
            clearInterval(timerId);
        }

    }, [time, status]);

    const handleGameStart = async () => {
        await fetchParagraph();
        setStatus('start');
        socket.emit('start-game', { lobbyCode, username: multiPlayerUsername });
    }

    const handleTypingEnd = () => {
        setStatus('stop');
        socket.emit('end-game', { lobbyCode, username: multiPlayerUsername, stats: { grossWPM, netWPM, accuracy, time, difficulty } });
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

                <Flex w="80vw" h={"50vh"} direction={'column'}>
                    {status === "start" && <Progress count={time} />}
                    {(pendingWords?.length > 0) && (status === "wait" || status === "start") && <TypeWriter
                        doneWords={doneWords}
                        pendingWords={pendingWords}
                        handleKeyDown={handleKeyDown}
                        handleReset={handleReset}
                    />}
                </Flex>
                {/* <Flex justify={'center'} w="80vw" align={'center'} >
                    {status == 'wait' && <Difficulty difficulty={difficulty} setDiffculty={setDiffculty} />}

                    <Tooltip label="reset">
                        <IconKeyboard size={"100px"} onClick={handleReset} />
                    </Tooltip>

                    {status === 'wait' && <Timing startTime={startTime} setStartTime={setStartTime} setTime={setTime} />}

                </Flex> */}
            </Flex>

        </>
    )
}

export default Lobby;