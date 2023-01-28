import React, { useEffect, useState, useRef } from "react";
import { activeNetworkAcces, auth, db, data, stopNetworkAcces } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, query, getDocs, collection, onSnapshot, serverTimestamp, where, addDoc, orderBy, doc, setDoc, Firestore } from "firebase/firestore";
import "./chat.css";
import { logout } from "../../firebase";

import hero from "../../assets/images/undraw_fingerprint_re_uf3f.svg";
import fing from "../../assets/images/fp.png";


function Chat() {

    const scroll = useRef();
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    
    const fetchUserInfo = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUsername(data.name);
            
        } catch (err) {
            console.error(err);
        }
    }; 


    function switchDashboard() {
        window.location.href = '/dashboard';
    }



    useEffect(() => {
        // activeNetworkAcces();
        fetchUserInfo();

        if (loading) return;
        if (!user) navigate("/");



    }, [user, loading]);



    return (      
        <>              
                <div className="btn-logout-chat">
                    <button onClick={logout} id="message-btn">Logout</button>
                </div>    
                <main className="landing-main">
                    <center><img className="fing" src={fing} alt="Finger"/></center>
                    <div id="landing-content">
                            <h1>Sécurisez vos accès aux services web avec l'authentification par empreinte digitale</h1>
                            <p>Simplifiez votre vie en vous connectant à vos services web en toute sécurité et en un seul clic avec votre empreinte digitale.</p>
                            <button onClick={switchDashboard} class="btn-primary" type="button">c'est parti</button>
                        </div>                    
                
                </main>                 
                   

        </>
    )
}

export default Chat;