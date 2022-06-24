// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOUk9sv1KxMH3JEJUoYGctmO03KDqr55Y",
  authDomain: "wce-gurukul.firebaseapp.com",
  projectId: "wce-gurukul",
  storageBucket: "wce-gurukul.appspot.com",
  messagingSenderId: "800622281298",
  appId: "1:800622281298:web:3d30399a0a487a6666958b",
  measurementId: "G-2PQB5NQ8NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Storage = getStorage(app,'gs://wce-gurukul.appspot.com');
export default Storage