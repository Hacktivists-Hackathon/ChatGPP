import React, { useEffect, useState } from "react";
import { auth,db,stopNetworkAcces,activeNetworkAcces, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { doc, updateDoc} from "firebase/firestore";
import "./dashboard.css";
import fing from "../../assets/images/fp.png";

// import { async } from "@firebase/util"

function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const [userData, setData] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();


    // Fetch username by uid
    const fetchUserInfo = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setData(data);     
            setName(data.name);
            setEmail(data.email)
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }; 


    
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
                       
            </>
        )    

}

export default Dashboard;