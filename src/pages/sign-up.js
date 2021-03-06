import React,{useContext,useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import {Link} from 'react-router-dom';
import * as ROUTES from '../consants/routes';
import {doesUsernameExist} from '../services/firebase';

export default function SignUp(){
 const history = useHistory();
 const { firebase } = useContext(FirebaseContext);

const [username,setUsername]=useState('');
const [fullName,setFullName]=useState('');
 const [emailAddress,setEmailAddress]=useState('');
 const [password,setPassword]=useState('');
 const [error,setError]=useState('');

 const isInValid= password === '' || emailAddress === '';

 const handlesignup= async (event)=>{
     event.preventDefault();
     const userNameExists = await doesUsernameExist(username);
  
    if(!userNameExists.length){
        try {
            const createdUserResult = await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress,password);

            //authentation
            //-->emailAdress and password & username(displayname)

            await createdUserResult.user.updateProfile({
                displayName: username
            });
            //firebaseusercollection (create a document)
            await firebase
            .firestore()
            .collection('users')
            .add({
                userId : createdUserResult.user.uid,
                username: username.toLowerCase(),
                fullName,
                emailAddress : emailAddress.toLowerCase(),
                following : [],
                dateCreated : Date.now()
            });
            history.push(ROUTES.DASHBOARD);
        } 
        catch (error) {
            setFullName('');
            setEmailAddress('');
            setPassword('');
            setError(error.message)
        }
        
    }  
     else{
         setError('username is already taken,try with another username');
     }
    
};

 useEffect(()=>{
     document.title="Sign-up-Instagram"
 },[]);

return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
           <img src="/images/iphone-with-profile.jpg" alt="iphone instagram"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                <h1 className="flex justify-center w-full">
                    <img src="/images/logo.png" alt="instagram" className="mt-2 w-6/12 mb-4"/>
                </h1>
                {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
               <form onSubmit={handlesignup} method="POST"> 

               <input type="text"
                    aria-label="Enter your username"
                     placeholder="username" 
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2"
                             onChange={({target})=>setUsername(target.value)} value={username}/>

                <input type="text"
                    aria-label="Enter your Fullname"
                     placeholder="Fullname" 
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2" 
                            onChange={({target})=>setFullName(target.value)} value={fullName}/>

                <input type="text"
                    aria-label="Enter your Email Address"
                     placeholder="Email address" 
                     className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border
                            border-gray-primary rounded mb-2"
                             onChange={({target})=>setEmailAddress(target.value)} value={emailAddress}/>

                <input type="password" aria-label="enter Your password" placeholder="Enter password"
                    className="text-sm text-gray-base w-full px-5 py-4 h-2 border 
                    border-gray-primary rounded mb-2" 
                    onChange={({target})=>setPassword(target.value )} value={password}/>

                <button 
                    disabled={isInValid}
                    type="submit"
                    className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                    ${isInValid && 'opacity-50'}`}>Sign Up</button>
               </form>
                </div>
                <div className="flex justify-center items-center flex-col 
                w-full bg-white p-4 border border-gray-primary rounded"><p className="text-sm"> Have an account?{`   `}
                <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">LogIn</Link></p>

                </div>
                </div>
        </div>
    )
}