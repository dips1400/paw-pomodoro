import { useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./Pomodoro.module.css";
import workingdog from '../images/working_dog.gif'
import sleepingdog from '../images/sleeping-dog.gif'
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

const Pomodoro = () => {

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [title, setTitle] = useState("Let the countdown begin!");
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);
  const [breakTimer, setBreakTimer] = useState(5*60);

  const navigate = useNavigate();
      const logout = () =>{
          localStorage.clear();
          navigate("/")
      }


  const startTimer = () => {
    if (intervalRef.current !== null) return;

    setTitle("You are doing great!");
    setIsRunning(true);

    
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft > 0) return timeLeft - 1;     
        resetTimer();
        return 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) 
      return ;

    setTitle("Keep it going!");
    setIsRunning(false);
    setIsCompleted(true);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };



  const breakTimerFun = () => {
    setTitle("Be relax. Go for walk");
    setInterval(() => {
        setBreakTimer((breakTimer) => {
          setIsCompleted(false)
          if (breakTimer > 0) {
          breakTimer=breakTimer - 1
          console.log(breakTimer); 
          return breakTimer;      
         }
         else{
          setIsCompleted(true)
          return 0;
         }
        });
      }, 1000); 
    }

  const resetTimer = () => {
    setTitle("Ready for another round!");
    breakTimerFun();
    clearInterval(intervalRef.current);
    console.log("reset timer")
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };


  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  
  return (
 
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <h1>Paw-Pomodoro Practice</h1>
                
                <div className={styles.btn}>
                    {/* <input type='text' value={setTimerValue}
                    ></input> */}
                 {!isRunning && <button onClick={startTimer}>Start</button>}
                 {isRunning && <button onClick={stopTimer}
                 {...breakTimer}
                 >Stop</button>}
                 <button onClick={resetTimer}>Reset</button>
                </div>
                <div className={styles.timer}>
                  <div className={styles.circle}>{minutes}</div>
                  <div className={styles.circles}>:</div>
                  <div className={styles.circle}>{seconds}</div>
                </div>
                {((!isCompleted) && (!isRunning))  && (<img src={sleepingdog} alt="pawimage" width={200} height={200} />)}
                {isRunning &&  <img src={workingdog} alt="pawimage" width={200} height={200} />}
            </div>
            <button className={styles.logout} onClick={logout}>Logout</button>
            {((!isCompleted) && (!isRunning))  && (<h2 className={styles.heading}>Take some break</h2>)}
            {isRunning &&  (<h2 className={styles.heading}>Get your work done..!!</h2>)}
        </div>
  );
};

export default Pomodoro