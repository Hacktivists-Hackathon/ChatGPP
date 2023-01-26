import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,  
} from "../../firebase";
import "./Register.css";


function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/chat");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="form">
        <h1>INSCRIPTION</h1>
        <div className="inputs">
          <br></br>
          <input type="email" value={name} onChange={(e) => setName(e.target.value)} placeholder="Entrez votre nom"></input>     
          {/* <input type="email" placeholder="Entrez votre prenom"></input>   */}
          {/* <select><option>Femme</option><option>Homme</option></select><br></br> */}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Entrez votre email"></input>
          <input value={password} onChange={(e) => setPassword(e.target.value)}type="password" placeholder="Entrez un mot de pass"></input>
        </div>

        <div className="btn">
          <div className="conR">
            <button onClick={register}>S'inscrire</button>
          </div>      
        </div> 
        <div className="already">
          <p>J'ai deja un compte </p><Link to="/Login">Me connecter</Link>
        </div>      
      </div>    
    </div>
  );
}

export default Register;