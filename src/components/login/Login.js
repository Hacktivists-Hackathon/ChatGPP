import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

import { client } from 'https://unpkg.com/@passwordless-id/webauthn';
import fingeerprintpic from "../../assets/images/fp.png";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();  
  const [isReady, setIsready] = useState(false);

    
  function logger() {
    console.log(isReady)
    if (isReady === true) {
      logInWithEmailAndPassword(email, password);
    } else {
      alert("Touch ID not set !!!");
    }
  }
  const login = async () => {
    console.log('Authenticating...')
    let res = client.authenticate([], 'random-challenge-base64-encoded')
    console.log(res);
    setIsready(true);
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    // if user login go to dashboard
    if (user) navigate("/chat");


    // const email_pass = document.querySelector(".email-pass");
    // const inpt = document.querySelector(".inputs-l");
    // email_pass.addEventListener('click', () => {
    //   inpt.style.display = "flex";
    // })

  }, [user, loading]);

  return (
    <div className="login">
      <div className="form">
        <h1>CONNEXION</h1>

        <div className="bio">Biometric</div>
        <div className="fingerClass">   
        <br></br>     
          <button onClick={login} className="touch-id-btn"><img src={fingeerprintpic}></img></button>
        </div>
        <br></br>
        <div className="email-pass">Email/Passe</div>

        <div className="inputs-l">
          <br></br>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email"></input>          
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Entrez votre mot de pass"></input>
          <div className="btn">
            <div className="con">
              <button onClick={logger} type="submit">Se connecter</button>
            </div>         
          </div>
        </div>
            {/* <button onClick={login}>Login</button> */}
        <div className="forget">          
          <div className="forget-pass"><Link to="/reset">Mot de pass oublier</Link></div>
          <p>Je n'ai pas de compte <Link to="/register"> Créer un compte</Link></p>
        </div>
      </div>
    </div>    
  );
}

export default Login;