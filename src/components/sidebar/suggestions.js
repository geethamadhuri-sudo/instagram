import {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import {getSuggestedProfiles} from '../../services/firebase';
import SuggestedProfile from './suggested-profile';

export default function Suggestions({
    userId,
    following,
    loggedInUserDocId}){
        console.log("following : ",following)
    const [profiles,setProfiles] = useState(null);
   //go head and get the suggested profiles
    const suggestedProfiles=async()=>{
       const response = await getSuggestedProfiles(userId,following);
          setProfiles(response)
    }
    
    useEffect(()=>{
        if(userId){
            suggestedProfiles();
    }
    },[userId])
    //hint : use the firebase service (call using userId )
    //getSuggestedProfiles
    //call the async function  within the useEffect method
    //go head and render (wait on the profiles as in 'skeleton')
 
    return !profiles ? (<Skeleton count={1} height={150}/> 
        ) : profiles.length > 0 ? (
            <div className="rounded flex flex-col">
                <div className="text-sm flex items-center align-items justify-between mb-2">
                <p className="font-bold text-gray-base">Suggestions for you</p>
                </div>
                <div className="mt-4 grid gap-5">
                    {
                        profiles.map((profile,i)=>(
                            <SuggestedProfile 
                                key={profile.docId}
                                profileDocId ={profile.docId}
                                username={profile.username}
                                profileId={profile.userId}
                                userId={userId}
                                loggedInUserDocId={loggedInUserDocId}/>
                        ))
                    }
                </div>
            </div>
        ) :null
}
Suggestions.prototypes={
userId : PropTypes.string,
following:PropTypes.array,
loggedInUserDocId:PropTypes.string

}