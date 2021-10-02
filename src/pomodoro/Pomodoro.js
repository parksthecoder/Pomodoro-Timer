import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import Initialize from "./Initialize";
import StartStop from "./StartStop";
import FocusTimer from "./FocusTimer";
import Progress from "./Progress";

/**
 * main component that represents a Pomodoro Timer
 * @returns {JSX} - <div> element containing all other components
 */

function Pomodoro() {
  const initTimer = {
    focusTime: 60 * 25,
    focusTimeLeft: 60 * 25,
    focusTimeFloor: 60 * 5,
    focusTimeRoof: 60 * 60,

    breakTime: 60 * 5,
    breakTimeLeft: 60 * 5,
    breakTimeFloor: 60 * 1,
    breakTimeRoof: 60 * 15,

    isTimerRunning: false,
    focus: true,
    sessionStarted: false,
  };

  // timer starts out initially as initTimer and changed with setTimer causing rerender
  const [timer, setTimer] = useState({ ...initTimer });

  // useInterval is called every second when the timer is on
  useInterval(
    () => {
      if (timer.focusTimeLeft <= 0 || timer.breakTimeLeft <= 0) {
        const alarm = new Audio(
          `https://onlineclock.net/audio/options/default.mp3`
        ).play();
        console.log(alarm);
        switchModes();
      } else {
        if (timer.focus) {
          timePassed("focusTimeLeft");
        } else {
          timePassed("breakTimeLeft");
        }
      }
    },
    timer.isTimerRunning ? 1000 : null
  );

  /**
   * if a second has passed, decrease the timer a second also
   * @param {string} - mode - is either "focusTimeLeft" or "breakTimeLeft"
   */

  function timePassed(mode) {
    setTimer(() => {
      return {
        ...timer,
        [mode]: timer[mode] - 1,
      };
    });
  }

  /**
   * once focusTimeLeft or breakTimeLeft reaches 0 / ends
   * --> switch modes and reset timers
   */

  function switchModes() {
    setTimer(() => {
      return {
        ...timer,
        focusTimeLeft: timer.focusTime,
        breakTimeLeft: timer.breakTime,
        focus: !timer.focus,
      };
    });
  }

  /**
   * Adds an extra 0 to the single digit numbers
   * @param {number} - num - number to pad
   * @return {number} - Padded number is returned if < 10
   */
  function pad(num) {
    return num < 10 ? "0" + num : num;
  }

  /**
   * Formats time in mm:ss
   * @param {string} - mode - either:
   * focusTime, focusTimeLeft, breakTime, breakTimeLeft
   */
  function getTime(mode) {
    return `${pad(Math.floor(timer[mode] / 60))} :${pad(timer[mode] % 60)}`;
  }

  /**
   * gets a key of the timer object
   * @param {string} key - key of the timer object
   */
  function get(key) {
    return timer[key];
  }

  /**
   * Increments / Decrements Time of focus/break
   * @param {string} mode -> Either "focus" or "break"
   * @param {number} change -> Amount to change Time by
   */
  function changeTime(mode, change) {
    const newTime =
      change < 0
        ? Math.max(timer[mode + "TimeFloor"], timer[mode + "Time"] + change)
        : Math.min(timer[mode + "TimeRoof"], timer[mode + "Time"] + change);

    setTimer(() => {
      return {
        ...timer,
        [mode + "Time"]: newTime,
        [mode + "TimeLeft"]: newTime,
      };
    });
  }

  /**
   * Plays / Pauses the timer
   */

  function playPause() {
    setTimer(() => {
      return {
        ...timer,
        isTimerRunning: !timer.isTimerRunning,
        sessionStarted: true,
      };
    });
  }

  /**
   * Stops the timer, resetting it
   */
  function stop() {
    setTimer(() => {
      return {
        ...timer,
        isTimerRunning: false,
        sessionStarted: false,
        focusTimeLeft: timer.focusTime,
        breakTimeLeft: timer.breakTime,
        focus: true,
      };
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <Initialize 
              changeTime={changeTime} 
              getTime={getTime} 
              mode="focus" />
        </div>
        <div className="col">
          <div className="float-right">
            <Initialize
              changeTime={changeTime}
              getTime={getTime}
              mode="break"
            />
          </div>
        </div>
      </div>
      <StartStop playPause={playPause} get={get} stop={stop} />

      <FocusTimer getTime={getTime} get={get} />

      <Progress get={get} />
    </div>
  );
}

export default Pomodoro;