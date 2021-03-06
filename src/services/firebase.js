
import {firebase, FieldValue} from '../lib/firebase';

export async function doesUsernameExist(username) {
   const result = await firebase
    .firestore()
    .collection('users')
    .where("username","==",username)
    .get();

    return result.docs.map((user)=>user.data().length > 0)
}
export async function getUserByUserId(userId){
    const result = await firebase.firestore().collection('users')
    .where('userId',"==",userId).get();
   const user = result.docs.map((item)=>({
        ...item.data(),
        docId:item.id
    }));
  
    return user;

}

export async function getSuggestedProfiles(userId,following){
    const result = await firebase.firestore().collection('users')
        .limit(10).get();
            return result.docs.map((user)=>({...user.data(),docId : user.id}))
        .filter((profile)=>profile.userId  !== userId && !following.includes(profile.userId))
    }


    export async function updateLoggedInUserFollowing( 
        loggedInUserDocId, // currently logged in user document id(karl's profile)
        profileId, // the user that karl requestes to follow
        isFollowingProfile // true/false (am i currently following this person)
        ) {
            console.log(loggedInUserDocId,profileId,isFollowingProfile)
                return firebase
                        .firestore()      
                        .collection('users')
                        .doc(loggedInUserDocId)
                        .update({
                            following : isFollowingProfile
                            ? FieldValue.arrayRemove(profileId)
                            :FieldValue.arrayUnion(profileId)
                        });
    }
    
    export async function updateFollowedUserFollowers( 
      profileDocId, // currently logged in user document id(karl's profile)
        loggedInUserDocId, // the user that karl requestes to follow
        isFollowingProfile // true/false (am i currently following this person)
        ) {
                console.log("profileDocId",profileDocId)
                console.log("loggedInUserDocId",loggedInUserDocId)
                return firebase
                        .firestore()      
                        .collection('users')
                        .doc(profileDocId)
                        .update({
                            followers : isFollowingProfile
                            ? FieldValue.arrayRemove(loggedInUserDocId)
                            :FieldValue.arrayUnion(loggedInUserDocId)
                        });
    }

    export async function getPhotos(userId,following){
        
        const result = await firebase
                            .firestore()
                            .collection('photos')
                            .where('userId', 'in', following)
                            .get()
          
    const userFollowedPhotos = result.docs.map((photo)=>({...photo.data(),
        docId:photo.id
      
    }));
 
    const photowithUserDetails = await Promise.all(
        userFollowedPhotos.map( async (photo)=>{
              let userLikedPhoto = false;  
              if(photo.likes.includes(userId)){
                  userLikedPhoto = true
              }
              //photo.userId =2
              const user= await getUserByUserId(photo.userId);
              //raphael
              const {username}=user[0]
              return {username,...photo,userLikedPhoto};
        })
    )
    return photowithUserDetails;
    }