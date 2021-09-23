import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    deleteUser,
    GithubAuthProvider,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateEmail,
    updatePassword,
    updateProfile
} from "firebase/auth";

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

export const userSignUp = async (name, email, password) => {
    let error = null;
    await createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => updateProfile(credential.user, { displayName: name }))
        .catch((err) => error = err.code)

    return error;
}

export const userAccountSignIn = async (email, password) => {
    let error = null;
    await signInWithEmailAndPassword(auth, email, password)
        .catch((err) => error = err.code)

    return error;
}

export const userProviderSignIn = async (providerName) => {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const provider = providerName === "google" ? googleProvider : githubProvider;
    let error = null;
    await signInWithPopup(auth, provider)
        .catch((err) => error = err.code)

    return error;
}

export const userSignOut = async () => {
    let error = null;
    await signOut(auth)
        .catch((err) => error = err.code)

    return error;
}

export const userResetPassword = async (email) => {
    let error = null;
    await sendPasswordResetEmail(auth, email)
        .catch((err) => error = err.code)

    return error;
}

export const userUpdateName = async (user, name) => {
    let error = null;
    await updateProfile(user, { displayName: name })
        .then(() => user.reload())
        .catch((err) => error = err.code)

    return error;
}

export const userUpdateEmail = async (user, email) => {
    let error = null;
    await updateEmail(user, email)
        .catch((err) => error = err.code)

    return error;
}

export const userUpdatePassword = async (user, newPassword) => {
    let error = null;
    updatePassword(user, newPassword)
        .catch((err) => error = err.code)

    return error;
}

export const userDeleteAccount = async (user) => {
    let error = null;
    deleteUser(user)
        .catch((err) => error = err.code)

    return error;
}
