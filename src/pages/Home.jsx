import React, { useEffect, useState } from "react";
import { auth,provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link,useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import pawimg from "../images/paww.gif";
import Pomodoro from "./Pomodoro";

const Home = () => { 

  const navigate = useNavigate();
  //const [goto,setGoto] = useState(false)
  const [value,setValue] = useState("");
  const handleClick = () =>{
    signInWithPopup(auth,provider).then((data) =>{
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }

  useEffect(()=>{
    setValue(localStorage.getItem('email'))
  })
  

  return (

<div className={styles.container}>
<div className={styles.innerBox}>
  <h1 className={styles.heading}>Welcome to Paw-Pomodoro</h1>

  <div>
      <div>
        <h1>
          <button>
          <Link to="/login">Login</Link>
          </button>
        </h1>
       
        <h1>
          <button>
          <Link to="/signup">Signup</Link>
          </button>
        </h1>
        <br></br>
        {value ? 
        window.location.replace("/pomodoro")
        :
          <button className={styles.google} onClick={handleClick}>Signing with google</button>
        }

      </div>
    </div>
    <br></br>
    <img src={pawimg} alt="pawimage" width={100} height={100} />
</div>
</div>
  );
}

export default Home;