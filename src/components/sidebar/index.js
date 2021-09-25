import React from 'react'
import useUser from "../../hooks/use-user";
import User from './user';
import Suggestions from'./suggestions';
import Skeleton from 'react-loading-skeleton';

export default function Sidebar(){
  // const {user}=useUser();
const {user : {docId,fullName,userId,username,following}}=useUser();


 return !username || !fullName || !userId || !following 
 ? (  <Skeleton count={1} height={61}/>) 
:(  <div className="p-4"> 
<User username={username} fullName={fullName} />   
 <Suggestions userId={userId} following={following} loggedInUserDocId={docId}/> 

</div> 

)  

};
// Sidebar.whyDidYouRender=true;
