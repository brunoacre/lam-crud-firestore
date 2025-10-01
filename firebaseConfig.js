import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "",
 authDomain: "",
 projectId: "",
 storageBucket: "", //NÃO ALTERE O .appspot.com
 messagingSenderId: "",
 appId: ""
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);