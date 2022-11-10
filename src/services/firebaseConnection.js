import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5vGvbeLAE9g23zbAk85N4B5jPIMIyQX8",
  authDomain: "kiinks.firebaseapp.com",
  projectId: "kiinks",
  storageBucket: "kiinks.appspot.com",
  messagingSenderId: "208380906519",
  appId: "1:208380906519:web:d7262f0fa9027cc33a6052",
  measurementId: "G-W3YTZS73F9",
};

const firebaseApp = initializeApp(firebaseConfig)

const bancoDados = getFirestore(firebaseApp)
const autenticacao = getAuth(firebaseApp)

export {bancoDados, autenticacao}