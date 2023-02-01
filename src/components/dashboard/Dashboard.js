import React, { useEffect, useState } from "react";
import { auth,db,stopNetworkAcces,activeNetworkAcces, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { doc, updateDoc} from "firebase/firestore";
import "./dashboard.css";
import fing from "../../assets/images/fp.png";
import fb from "../../assets/images/fb_icon_325x325.png";
import tt from "../../assets/images/logo.png";
import ll from "../../assets/images/download.png";
import ii from "../../assets/images/Instagram_logo_2022.svg.png";


function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [userData, setData] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [facebook, setFacebook] = useState("");

    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [actionF, setActionF] = useState("");
    const [actionI, setActionI] = useState("");
    const [actionL, setActionL] = useState("");
    const [actionT, setActionT] = useState("");

    const saveDataUserToFirebase = async () => {
        console.log(email);
        console.log(password);
        updateUserProfile();
    }

    // Fetch username by uid
    const fetchUserInfo = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setData(data);     
            setName(data.name);
            setFacebook(data.facebook);            
            console.log(data)
            if (data.facebook === true) {
                setActionF("Retirer");
                const conn = document.querySelector('.conn');
                conn.style.display = 'block';   
            } else {
                setActionF("Ajouter");
            };
     
            if (data.twitter === true) {
                setActionT("Retirer");
                const conn = document.querySelector('.conn');
                conn.style.display = 'block';   
            } else {
                setActionT("Ajoute");
            };
           
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
                    facebook: true,
                });
            } catch (err) {
            console.error(err);               
        }
        alert('Service Ajouter');
        window.location.reload();
        }
        fetchUserInfo();
    }


    const connFb = async () => {
        console.log("satrt chromium login");
    }
    const connTt = async () => {
        console.log("satrt chromium login");
    }

    const getFb = async () => {
        if (facebook === true) {
            try {
                const userDocByUsername = doc(db, "users", name);
                await updateDoc(userDocByUsername, {
                    facebookEmail: null,
                    facebookPass: null,
                    facebook: false,
                    });
                alert("Service Retirer");
                window.location.reload();

                } catch (err) {
                console.error(err);               
            }
        } else {
            const add_db = document.querySelector('.add-db');
            add_db.style.display = 'block';            
        }
    }

    const getTt = async () => {
        if (twitter === true) {
            try {
                const userDocByUsername = doc(db, "users", name);
                await updateDoc(userDocByUsername, {
                    twitterEmail: null,
                    twitterPass: null,
                    twitter: false,
                    });
                alert("Service Retirer");
                window.location.reload();

                } catch (err) {
                console.error(err);               
            }
        } else {
            const add_db = document.querySelector('.add-db');
            add_db.style.display = 'block';            
        }
    }

    // const getIg = async () => {
    //     if (facebook === true) {
    //         try {
    //             const userDocByUsername = doc(db, "users", name);
    //             await updateDoc(userDocByUsername, {
    //                 instagramEmail: null,
    //                 instagramPass: null,
    //                 instagram: false,
    //                 });
    //             alert("retirer");
    //             window.location.reload();

    //             } catch (err) {
    //             console.error(err);               
    //         }
    //     } else {
    //         const add_db = document.querySelector('.add-db');
    //         add_db.style.display = 'block';            
    //     }
    // }

    // const getLk = async () => {
    //     if (facebook === true) {
    //         try {
    //             const userDocByUsername = doc(db, "users", name);
    //             await updateDoc(userDocByUsername, {
    //                 linkedinEmail: null,
    //                 linkedinPass: null,
    //                 linkedin: false,
    //                 });
    //             alert("retirer");
    //             window.location.reload();

    //             } catch (err) {
    //             console.error(err);               
    //         }
    //     } else {
    //         const add_db = document.querySelector('.add-db');
    //         add_db.style.display = 'block';            
    //     }
    // }


    
    useEffect(() => {        
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
            <br></br>
            <div className="item">
                <div className="select-area">
                        <center><img src={fb} /></center>
                        <button onClick={getFb} className="add">{actionF}</button>
                        <button onClick={connFb} className="conn">se connecter</button>
                    </div>
                    <div className="select-area2">
                        <center><img src={tt} /></center>
                        <button onClick={getTt} className="add">{actionT}</button>
                        <button onClick={connTt} className="conn">se connecter</button>
                    </div>    
            </div>

            <div className="item">
                <div className="select-area">
                        <center><img src={ii} /></center>
                        <button  className="add">{actionT}</button>
                        <button onClick={connFb} className="conn">se connecter</button>
                    </div>
                    <div className="select-area2">
                        <center><img src={ll} /></center>
                        <button className="add">{actionT}</button>
                        <button onClick={connFb} className="conn">se connecter</button>
                    </div>    
            </div>
                         

            <center className="add-db">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Entrez votre email"></input>          
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Entrez votre mot de pass"></input>
                <button  onClick={saveDataUserToFirebase}>Enregistrer</button>
            </center>
                       
            <div className="btn-logout-chat">
                <button onClick={logout} id="message-btn">Logout</button>
            </div>    
            </>
        )    

}

export default Dashboard;