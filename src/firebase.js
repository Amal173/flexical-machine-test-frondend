// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAeFyUbns7D4CEbp0ki6cgz4UwOAN9EanU",
    authDomain: "blog-page-fdecb.firebaseapp.com",
    projectId: "blog-page-fdecb",
    storageBucket: "blog-page-fdecb.appspot.com",
    messagingSenderId: "826534437148",
    appId: "1:826534437148:web:71d587eb1ef309e6ab9ad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider();

export const logout = () => {
    signOut(auth)
}

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user;
        console.log(res.user, "resss");
        const q = query(collection(db, "users"), where("uid", "==", user.uid))
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export const sendPasswordReset = async (email) => {
    try {
        console.log(email, "email");
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};


export default app;