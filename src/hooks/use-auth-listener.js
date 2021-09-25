import {useState,useEffect,useContext} from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener(){
    const [user,setUser] =useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase} = useContext(FirebaseContext);


    // useEffect(()=>{
    //     const listener = firebase.auth().onAuthStateChanged((authUser)=>{
    //         if(authUser){
    //             //we have a user ..therefore we store a user in localstorage
    //             localStorage.setItem('authuser',JSON.stringify(authUser));
    //             setUser(authUser);
    //         }
    //         else{
    //             //we dont have a authuser ,then clear the localstorage
    //             localStorage.removeItem('authUser');
    //             setUser(null)
    //         }
    //         return ()=>listener();
    //     },[firebase])
    // });

    useEffect(()=>{
        const listener = firebase.auth().onAuthStateChanged((authUser)=>{
            if(authUser){
                localStorage.setItem('authUser',JSON.stringify(authUser));
                setUser(authUser);
            }
            else{
                localStorage.removeItem('authUser');
                setUser(null)
            }
            return ()=>listener;
        })
    },[firebase])
return {user};

}