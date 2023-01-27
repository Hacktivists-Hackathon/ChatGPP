import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  doc,
  setDoc,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getDatabase, ref, set } from "firebase/database";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaOP-pYVSRK4VYEMIp9dCV6T_6scZp8rI",
  authDomain: "chatgpp-6a24f.firebaseapp.com",
  projectId: "chatgpp-6a24f",
  storageBucket: "chatgpp-6a24f.appspot.com",
  messagingSenderId: "605830339889",
  appId: "1:605830339889:web:3995997ba0d3e79d332410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    console.log(err.message); 
    // alert(err.message);
    alert("Problème de connexion, Email ou mot de pass incorect");
  }
};

const registerWithEmailAndPassword = async (name, email, password, file) => {
  const photo = file;

  try {    
        
    // set on Firestore the user informations on user doc call {name}
    const userDoc = collection(db, "users");

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(userDoc, name), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      photo,
    });

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Firebase storage reference
const storage = getStorage(app);
export default storage;


const logout = () => {
  signOut(auth);
  window.location.href = "/";
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};