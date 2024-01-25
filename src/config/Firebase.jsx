"use client";
import { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const signupUser = ({ email, password }) => {
    console.log("signup");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("2");
        const user = userCredential.user;
        console.log("Registration successful:", user);
        alert("Registration Successful");
      })
      .catch((err) => {
        console.log("signup");
        alert("Error:", err.message);
        console.log("Registration not successful:", err);
      });
  };

  const signinUser = ({ email, password }) => {
    console.log("Signin");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful:", user);
        alert("Login Successful");
      })
      .catch((err) => {
        alert("Login Failed!");
        console.log("Login not successful:", err);
      });
  };
  const signout = () => {
    signOut(auth)
      .then((res) => {
        alert("Logout Successful");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const State = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return true;
      }
      return false;
    });
  };

  // const isLoggedin = auth;

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        signinUser,
        signout,
        State,
        // isLoggedin,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
