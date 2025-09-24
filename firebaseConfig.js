import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyD-ze8S1FyrqulSIw9P-LClZpIiqCWszIY",
 authDomain: "app-react-native-2025.firebaseapp.com",
 projectId: "app-react-native-2025",
 storageBucket: "app-react-native-2025.appspot.com", //NÃO ALTERE O .appspot.com
 messagingSenderId: "1086621941454",
 appId: "1:1086621941454:web:ec15d1a00823f97cb09a9f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);