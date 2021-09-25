import React,{useContext,useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import {Link} from 'react-router-dom';
import * as ROUTES from '../consants/routes';

export default function Login(){
 const history = useHistory();
 const { firebase } = useContext(FirebaseContext);

 const [emailAddress,setEmailAddress]=useState('');
 const [password,setPassword]=useState('');
 const [error,setError]=useState('');

 const isInValid= password === '' || emailAddress === '';

 const handleLogin= async (event)=>{
     event.preventDefault();

     try {
        await firebase.auth().signInWithEmailAndPassword(emailAddress,password);
        history.push(ROUTES.DASHBOARD);
     } catch (error) {
         setEmailAddress('');
         setPassword('');
         setError(error.message);
         
     }

 };

 useEffect(()=>{
     document.title="Login-Instagram"
 },[]);

return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
           <img src="/images/iphone-with-profile.jpg" alt="iphone with pic"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                <h1 className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="instagram" className="mt-2 w-6/12 mb-4"/>
                </h1>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
               <form onSubmit={handleLogin} method="POST"> 
                   <input type="text"
                    aria-label="Enter your Email Address"
                     placeholder="Email address" 
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2" onChange={({target})=>setEmailAddress(target.value)}/>

                    <input type="password" aria-label="enter Your password" placeholder="Enter password"
                    className="text-sm text-gray-base w-full px-5 py-4 h-2 border 
                    border-gray-primary rounded mb-2" onChange={({target})=>setPassword(target.value )}/>

                    <button 
                    disabled={isInValid}
                    type="submit"
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                    ${isInValid && 'opacity-50'}`}>Log In</button>
               </form>
                </div>
                <div className="flex justify-center items-center flex-col 
                w-full bg-white p-4 border border-gray-primary rounded"><p className="text-sm">Don't have an account?{`   `}
                <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-medium">Sign Up</Link></p>

                </div>
                </div>
        </div>
    )
}