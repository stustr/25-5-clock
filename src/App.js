import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faArrowsRotate, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  // set states
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [live, setLive] = useState(false);
  const [timerType, setTimerType] = useState("Session");
  const [timerDur, setTimerDur] = useState(150);
  const audio = document.getElementById("beep");

  // variables
  const timerTypeTitle = timerType === "Session" ? "Session" : "Break";

  // functions
  function breakInc() {
    if (breakLength < 60) {
      reset();
      setBreakLength(breakLength + 1);
    }
  }

  function breakDec() {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  function sessInc() {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimerDur(timerDur + 60);
    }
  }

  function sessDec() {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimerDur(timerDur - 60);
    }
  }

  function formatTime() {
    let minutes = Math.floor(timerDur / 60);
    let seconds = timerDur % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  }

  function reset() {
    console.log("reset");
    setLive(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerDur(1500);
    setTimerType("Session");
    audio.pause();
    audio.currentTime = 0;
  }

  const timerLoop = () => {
    if (!timerDur && timerType === "Session") {
      setTimerDur(breakLength * 60);
      setTimerType("Break");
      audio.play();
    }
    if (!timerDur && timerType === "Break") {
      setTimerDur(sessionLength * 60);
      setTimerType("Session");
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const liveSwitch = () => {
    setLive(!live);
  };

  useEffect(() => {
    if (live) {
      const timeout = setTimeout(() => {
        setTimerDur(timerDur - 1);
      }, 1000);
      timerLoop();
      return () => {
        clearTimeout(timeout)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveSwitch, sessInc])
  

  return (
    <div className="App">
      <div className="Pomo-timer">
        <div className="pom1">
          <div className="buttons" id="break-label">
            Break length
          </div>
          <div className="buttons" id="session-label">
            Session length
          </div>
        </div>
        <div className="pom2">
          <button
            disabled={live}
            className="buttons"
            id="break-decrement"
            onClick={() => breakDec()}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
          <div className="buttons" id="break-length">
            {breakLength}
          </div>
          <button
            disabled={live}
            className="buttons"
            id="break-increment"
            onClick={() => breakInc()}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <button
            disabled={live}
            className="buttons"
            id="session-decrement"
            onClick={() => sessDec()}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>

          <div className="buttons" id="session-length">
            {sessionLength}
          </div>
          <button
            disabled={live}
            className="buttons"
            id="session-increment"
            onClick={() => sessInc()}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
        <div className="buttons" id="timer-label">
          {timerTypeTitle}
        </div>
        <div className="buttons" id="time-left">
          {formatTime(timerDur)}
        </div>
        <div className="pom5">
          <button className="buttons" id="start_stop" onClick={liveSwitch}>
            <FontAwesomeIcon icon={faPlay} /> <FontAwesomeIcon icon={faPause} />
          </button>
          <button className="buttons" id="reset" onClick={reset}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
