import {useState, useEffect, useContext} from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser(){
    const [activeUser,setactiveUser]=useState({});
    const {user}=useContext(UserContext);
       
useEffect(()=>{
   if(user?.uid){
     getUserObjByUserId();   
    }
},[user])

const getUserObjByUserId=async ()=>{
 //we need a function that to call the firebase service to get the user data based on UserId.
        const [response]= await getUserByUserId(user.uid);
     
        setactiveUser(response)
    }
    return {user:activeUser};
}
