import React, {useState, useEffect, useRef} from "react";
import Head from 'next/head';
import Result from "../Result";
import Timer from "../Timer";
import randomWords from 'random-words';

export const siteTitle = 'Typing Test Challenge';

const noOfWords = 100;

export default function Layout() {
    const [words, setWords] = useState([]);
    const [seconds, setSeconds] = useState(60);
    const [countDown, setCountDown] = useState(seconds);
    const [userInput, setUserInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(-1);
    const [currentChar, setCurrentChar] = useState('');
    const [correct, setCorrect] = useState(0);
    const [inCorrect, setInCorrect] = useState(0);
    const [status, setStatus] = useState('waiting');
    const textInput = useRef(null);
    const [chooseText, setChooseText] = useState(false);
    const [customPhrase, setCustomPhrase] = useState('');
    const [totalWords, setTotalWords] = useState(0);

    const secondsToDisplay = countDown % 60;
    const minutesRemaining = (countDown - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;


    const timerMinutes = minutesToDisplay < 10 ? `0${minutesToDisplay}` : minutesToDisplay;
    const timerSecond = secondsToDisplay < 10 ? `0${secondsToDisplay}` : secondsToDisplay;

    const generateWords = () => {
        if (customPhrase) {
             return customPhrase.toLowerCase().split(' ');
        } else {
            return new Array(noOfWords).fill(null).map(() => randomWords());
        }
    };

    const setTimer = (e) => {

        setSeconds(e * 60);
        setCountDown(e * 60);
    };

    useEffect(() => {
        setWords(generateWords());
    }, [customPhrase]);

    useEffect(() => {
        if (status === 'started') {
            textInput.current.focus()
        }
    }, [status]);

    const reset = () => {
        setCountDown(0);
        setSeconds(seconds);
        setUserInput('');
        setStatus('finished');

    };

    const start = () => {
        if (status === 'finished') {
            setWords(generateWords());
            setCurrentWordIndex(0);
            setCorrect(0);
            setInCorrect(0);
            setCurrentCharIndex(-1);
            setCurrentChar("");
        }

        if (status !== 'started') {
            setStatus('started');
            let interval = setInterval(() => {
                setCountDown((prevState) => {
                    if (prevState === 0){
                        clearInterval(interval);
                        setStatus('finished');
                        setTotalWords(words.length);
                        setUserInput('');
                        setCustomPhrase('');
                        setChooseText(false);
                        return seconds;
                    } else {
                        return prevState - 1
                    }
                })
            }, 1000)
        }
    };

    const checkMatch = () => {
        const word = words[currentWordIndex];
        const match = word === userInput.trim();
        if (match) {
            setCorrect((prevState) => prevState + 1)
        } else {
            setInCorrect((prevState) => prevState + 1)
        }
    };

    const keyPress = (e) => {
        if (e.keyCode === 32){
            checkMatch();
            setCurrentWordIndex((prevState) => prevState + 1);
            setUserInput('');
            setCurrentCharIndex(-1);
        }
        else if (e.keyCode === 8) {
            setCurrentCharIndex(currentCharIndex - 1);
            setCurrentChar('')
        }
        else {
            setCurrentCharIndex(currentCharIndex + 1);
            setCurrentChar(e.key)
        }
    };

    const getClassName = (wordIndex, charIndex, char) => {
        if (wordIndex === currentWordIndex && charIndex === currentCharIndex && currentChar && status !== 'finished') {
            if (char === currentChar) {
                return 'has-background-success'
            } else {
                return 'has-background-danger'
            }
        } else if (wordIndex === currentWordIndex && currentCharIndex >= words[currentWordIndex].length) {
            return 'has-background-danger'
        }
        else {
            return ''
        }
    };

    return (
        <div data-testid={'layout'}>
            <Head>
                <link rel="icon" href="../../public/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <title>{siteTitle}</title>
            </Head>
            <div style={{background: 'black', padding: '10px', minHeight: "100vh"}}>
                <div className="section">
                    <div className="is-size-1 has-text-centered has-text-primary">
                        <h2 data-testid={'time-header'}>{timerMinutes} : {timerSecond}</h2>
                    </div>
                    <Timer status={status} reset={reset} setTimer={setTimer}/>
                </div>
                <div className="control is-expanded section">
                    <input
                        ref={textInput}
                        disabled={status === 'finished'}
                        type="text" className={'input'}
                        data-testid={'keyChange'}
                        onKeyDown={keyPress} value={userInput}
                        onChange={(e) =>setUserInput(e.target.value)}/>
                </div>
                <div className="section">
                    <button
                        className="button is-success is-fullwidth"
                        data-testid={'start'}
                        onClick={start}>
                        Start Typing
                    </button>
                </div>
                {status === 'finished' ? null : (
                    <div className={'section'} data-testid={'words'}>
                        <div className="card">
                            <div className="card-content">
                                <div className="content">
                                    {words.map((word, i) => (
                                        <span key={i} data-testid={'randomWords'}>
                                    {word.split('').map((char, index) => (
                                        <span className={getClassName(i, index, char)} key={index}>{char}</span>
                                    ))} {' '}
                                </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {
                    chooseText && (
                        <div className={'section'}>
                            <textarea
                                className={'textarea'}
                                placeholder={'Enter Your Paragraph here'}
                                value={customPhrase}
                                disabled={status === 'started'}
                                onChange={(e) => setCustomPhrase(e.target.value)}
                                name="" id="" cols="30" rows="10"/>
                        </div>
                    )
                }
                {
                    status !== 'started' && (
                        <div className={'section'}>
                            <button style={{margin: '10px'}}
                                    className="button is-info"
                                    onClick={() => setChooseText((prevState) => !prevState)}
                                    data-testid={'custom-text'}
                            >
                                Use Custom Text
                            </button>
                        </div>

                    )
                }
                {
                    status === 'finished' && (
                        <Result correct={correct} inCorrect={inCorrect} seconds={seconds} totalWords={totalWords}/>
                    )
                }
            </div>
        </div>
    );
}