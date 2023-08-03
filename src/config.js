import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyAdwNH9heb9rfaSsOIEhyrL6POereteljU",
    authDomain: "retinareact-633c9.firebaseapp.com",
    projectId: "retinareact-633c9",
    storageBucket: "retinareact-633c9.appspot.com",
    messagingSenderId: "413034726002",
    appId: "1:413034726002:web:d73a3f9ec190bfaa3b38eb",
    measurementId: "G-R00W7XXEW2"
  };

if(firebase.app.length){
    console.log(firebase.app.length)
   firebase.initializeApp(firebaseConfig) 
}