import React, { useState, useEffect, useRef, FC } from "react";

interface TimerProps {
    sessionLength: number;
    breakLength: number;
}
/** Timer component, receives sessionLength and breakLength as props */
const Timer: FC<TimerProps> = ({ sessionLength, breakLength}) => {

    /**  timeLeft - stores the remaining time. Initially set to sessionLength in minutes converted to seconds. */
    const [timeLeft, setTimeLeft] = useState(sessionLength * 60);

    /** isSession - true means it's session time (work time), false means it's break time. */
    const [isSession, setIsSession] = useState(true);

    /** isActive - indicates whether the timer is active or not. Initially set to false, meaning the timer is paused. */
    const [isActive, setIsActive] = useState(false);

    /** intervalRef - used to store the id of the setInterval function. This allows us to control the interval (clear it when needed) */
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        /** Reset the timer whenever sessionLength or breakLength changes  */
        setTimeLeft(sessionLength * 60);
    }, [sessionLength, breakLength]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        /**  Switch between session and break */
                        setIsSession((prevSession) => !prevSession);
                        /** Reset to session or break length */
                        return isSession ? breakLength * 60 : sessionLength * 60;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current){
                clearInterval(intervalRef.current);
            }
        };
    }, [isActive, isSession, sessionLength, breakLength]);

    const formatTime = (seconds: number) =>{

        /**  Calculate the number of minutes by dividing seconds by 60 and rounding down */
        const minutes = Math.floor(seconds / 60);

        /** Calculate the remaining seconds after converting minutes */
        const remainingSeconds = seconds % 60;
        /** Return a formatted string with two digits for minutes and remaining seconds */
        /** If minutes are less than 10, prepend a '0' to ensure two digits (e.g. '03') */
        /** If remainingSeconds are less than 10, prepend a '0' to ensure two digits (e.g. '09') */
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

return (
    <div className="timer">
        <div className="timer-display">{formatTime(timeLeft)}</div>
        <button className="timer-button" onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Pause' : 'Start'}
        </button>
    </div>
    );
};

export default Timer;