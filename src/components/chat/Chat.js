import React, { useEffect, useState, useRef } from "react";
import { activeNetworkAcces, auth, db, data, stopNetworkAcces } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, query, getDocs, collection, onSnapshot, serverTimestamp, where, addDoc, orderBy, doc, setDoc, Firestore } from "firebase/firestore";
import "./chat.css";
import { logout } from "../../firebase";

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

    // Send message function
    const sendMessage = async () => {
        console.log(username);
        try {
        //get message from form field
        const msg = document.getElementById("message").value;
        if (msg == '') {
            // alert(2);
        } else {
            //set data to insert in an object
            const insertData = {
                message: msg,
                sender: username,
                timestamp: serverTimestamp(),
            }        
    
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "messages"), insertData);
            var check = console.log("Document written with ID: ", docRef.id);
            
            addSample('');
        }

        } catch (err) {
            console.log(err);
        }     
    }


    function addSample(text) {
        const msg = document.getElementById("message");
        msg.value = `${text}`;
    }


    useEffect(() => {
        // activeNetworkAcces();
        fetchUserInfo();

        if (loading) return;
        if (!user) navigate("/");

        const q = query(collection(db, 'messages'), orderBy('timestamp'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages.reverse());
        });
        return () => unsubscribe();
        // stopNetworkAcces();

    }, [user, loading]);



    return (      
        <>        

                <div className="chat-content">

                    <div id="chat">
                        <h1>ChatRoom</h1>
                        {/* messages will display here */}
                        <div className="chat-cta">
                            <div className="msgs">
                                {messages.map(({ id, message, sender, photoURL, uid }) => (
                                    <div className="msgs-cta">
                                        <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                            <h4>{sender}</h4>
                                            <p>{message}</p>
                                        </div>
                                        <hr className="hr-chat"></hr>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="btn-chat">                        
                        <div className="btn-form-chat">
                            <textarea rows="5" cols="50" id="message" type="text"></textarea>
                            <button onClick={sendMessage} id="message-btn">Envoyer</button>
                        </div>
                    </div>    

                    <div className="btn-logout-chat">
                            <button onClick={logout} id="message-btn">Logout</button>
                    </div>       
                </div>            

        </>
    )
}

export default Chat;