// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Use full Firestore SDK
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaA7vDGYe1jj_d1zy367sWFZSk2SR5Huk",
  authDomain: "blog-app-with-react-firebase.firebaseapp.com",
  projectId: "blog-app-with-react-firebase",
  storageBucket: "blog-app-with-react-firebase.appspot.com",
  messagingSenderId: "787377202167",
  appId: "1:787377202167:web:9dfee0bbbae6007280c4f2",
  measurementId: "G-QH200F6REM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, auth };
