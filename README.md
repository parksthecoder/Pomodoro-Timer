React Component Structure
* index.js - Entry point into React Application
    * App.js - Includes Pomodoro App
        * /pomodoro/Pomodoro.js 
        - sends changeMax={changeTime} getTime={getTime} mode="focus" to Initialize.js; 
        - sends playPause={playPause} get={get} stop={stop} to StartStop.js
        - sends getTime={getTime} get={get} to FocusTimer.js
        - sends get={get} to Progress.js
            * /utils/useInterval.js - if timeRemaning is 0 play a sound
            * /Pomodoro/Initialize.js -  receives changeTime={changeTime} getTime={getTime} mode="focus" from Pomodoro.js
            * /Pomodoro/StartStop.js  - receives playPause={playPause} get={get} stop={stop} from Pomodoro.js
                * /utils/class-names.js
            * /Pomodoro/FocusTimer.js - receives getTime={getTime} get={get} from Pomodoro.js
            * /Pomodoro/Progress.js  - receives get={get} from Pomodoro.js