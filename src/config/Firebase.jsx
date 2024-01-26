"use client";
import { createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  collection,
} from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { redirect } from "next/dist/server/api-utils";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const signupUser = ({ email, password }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Registration Successful");
        // alert("Registration Successful");

        redirect(user, 200, "/home");
      })
      .catch((err) => {
        toast.error("Singup Failed!");
        alert("Error:", err.message);
      });
  };

  const signinUser = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successful");
      })
      .catch((err) => {
        // alert("Login Failed!");
        toast.error("Login Failed!");
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
  const craeteTodo = async (data) => {
    console.log(data);
    await setDoc(doc(firestore, "todos", auth.currentUser.uid), data);
  };
  const fetchAlltodos = async () => {
    // const docRef = doc(firestore, "todos", auth.currentUser.uid);
    // // const docRef = doc(firestore, "todos",where(uid,"==", auth.currentUser.uid ));
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   return docSnap.data();
    // } else {
    //   console.log("No such document!");
    // }
    let todos = [];
    const querySnapshot = await getDocs(collection(firestore, "todos"));
    querySnapshot.forEach((doc) => {
      if (doc.id == auth.currentUser.uid) {
        todos.push(doc.data());
      }
      // console.log(doc.id, " => ", doc.data());
    });
    console.log(todos);
    return todos;
  };
  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestore, "todos", id));
  };

  // const isLoggedin = auth;

  return (
    <FirebaseContext.Provider
      value={{
        signupUser,
        signinUser,
        signout,
        State,
        craeteTodo,
        fetchAlltodos,
        deleteDoc,
        // isLoggedin,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
