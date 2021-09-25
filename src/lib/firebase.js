import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//here i want to import the seed file
// import {seedDatabase} from '../seed';

const config = {
  apiKey: "AIzaSyAIKkkHS9JBzUO8Klqqq7NwCe90DmyYBSs",
  authDomain: "newinstagram-5fb26.firebaseapp.com",
  projectId: "newinstagram-5fb26",
  storageBucket: "newinstagram-5fb26.appspot.com",
  messagingSenderId: "535083402440",
  appId: "1:535083402440:web:17865258cb3a45af3291fd"
};
const firebase=Firebase.initializeApp(config);
const  {FieldValue } = Firebase.firestore;


//here is where i want to call the seed file (  ONLY ONCE! )
// seedDatabase(firebase);


export  { FieldValue,firebase };
