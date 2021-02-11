import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAVsFVaRC0yXN_vL7Jvwj1UUHPSlx8vxKc",
    authDomain: "ecommerce-shop-c73e0.firebaseapp.com",
    projectId: "ecommerce-shop-c73e0",
    storageBucket: "ecommerce-shop-c73e0.appspot.com",
    messagingSenderId: "805332087755",
    appId: "1:805332087755:web:2ed5851cf0d7422304fc4e"
};

// Initialize Firebase
Firebase.initializeApp(firebaseConfig);

export const auth = Firebase.auth()

export const googleAuthProvider = new Firebase.auth.GoogleAuthProvider()
