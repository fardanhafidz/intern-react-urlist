import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvTY_yR3-0aoMjJuBhHmBgivjzGMgdJDE",
  authDomain: "https://console.firebase.google.com/u/0/project/intern-react-todo/database/intern-react-todo-default-rtdb",
  projectId: "intern-react-todo",
  storageBucket: "intern-react-todo.appspot.com",
  messagingSenderId: "276799531752",
  appId: "1:276799531752:web:5e27b630bde8818785b75d",
  measurementId: "G-B2QSJG46YE",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
