import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

export const authContext = createContext(null)

const Authprovider = ({children}) => {

    const [user,setUser] = useState()
    const [loading,setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const handleGoole = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo 
        });
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,async currentUsers => {
            console.log(currentUsers)
            setUser(currentUsers)
           setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        signInUser,
        logoutUser,
        createUser,
        handleGoole,
        updateUserProfile,
    }

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Authprovider;