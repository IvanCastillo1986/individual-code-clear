import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

initializeApp(firebaseConfig);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const userSignUp = async (name, email, password, url) => {
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, {
            displayName: name,
            photoURL: url
        })
    } catch (error) {
        console.log(error);
    }
}

export const userAccountSignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
}

export const userProviderSignIn = async (providerName) => {
    try {
        const provider = providerName === "google" ? googleProvider : githubProvider;
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.log(error);
    }
}

export const userSignOut = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.log(err);
    }
}
