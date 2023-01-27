import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,  
} from "../../firebase";
import "./Register.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";



function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [fileUrl, setUrl] = useState("");
  const [percent, setPercent] = useState(0);
  const [isReady, setIsready] = useState(true);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, fileUrl);
  };



  useEffect(() => {
    if (loading) return;
    if (user) navigate("/chat");

      // let camera_button = document.querySelector("#start-camera");
      // let video = document.querySelector("#video");
      // let click_button = document.querySelector("#click-photo");
      // let canvas = document.querySelector("#canvas");
      
      // camera_button.addEventListener('click', async function() {
      //     let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      //     video.srcObject = stream;
      // });
      
      // click_button.addEventListener('click', function() {
      //      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      //      let image_data_url = canvas.toDataURL('image/jpeg');
      
      //      // data url of the image
      //      setUrl(image_data_url);
      //      console.log(image_data_url); 
      // });


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

      {/* <label className="create-label">
        <button id="start-camera">Start Camera</button>
        <video id="video" width="320" height="240" autoPlay></video>
        <button id="click-photo">Click Photo</button>
        <canvas id="canvas" width="320" height="240"></canvas>
      </label> */}

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