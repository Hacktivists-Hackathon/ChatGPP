import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

import * as webauthn from '@passwordless-id/webauthn';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();  
  const [isReady, setIsready] = useState(false);

    
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
  }, [user, loading]);

  return (
    <div className="login">
      <div className="form">
        <h1>CONNEXION</h1>
        <div className="inputs">
          <br></br>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez votre email"></input>          
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Entrez votre mot de pass"></input>
        </div>

        <div className="btn">
          <div className="con">
            <button onClick={() => logInWithEmailAndPassword(email, password)} type="submit">Se connecter</button>
          </div>         
        </div>
            <button onClick={login}>Login</button>
        <div className="forget">          
          <div className="forget-pass"><Link to="/reset">Mot de pass oublier</Link></div>
          <p>Je n'ai pas de compte <Link to="/register"> Créer un compte</Link></p>
        </div>
      </div>
    </div>    
  );
}

export default Login;