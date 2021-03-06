import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { memo } from 'react';

// import {useState,useEffect} from 'react'

const User=({username,fullName})=>{
   
 
// const[show,setShow]=useState(false);
// const delay=1
//     useEffect(()=>{
//         let timer1=setTimeout(()=>setShow(true) , delay * 1000)
//         return() =>{
//             clearTimeout(timer1)
//         }
//     })

// return show  && username && fullName ? 

// (
//     <Link to = {`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
//     <div className="flex items-center justify-between col-span-1">
//        <img className="rounded-full w-16 flex mr-3"
//        src={`/images/avatars/${username}.jpg`}
//        alt=""/>
//    </div>
//      </Link>
// )

// :( <Skeleton count={1} height={61}/>)

    
  return  !username || !fullName ? ( 
        <Skeleton count={1} height={61}/>
    ):( 
        <Link to = {`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img className="rounded-full w-16 flex mr-3"
                src={`/images/avatars/${username}.jpg`}
                alt=""/>
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{username}</p>
                <p className="text-sm">{fullName}</p>
               
            </div>
           
        </Link>
    );
    
}
export default memo(User);
// User.whyDidYouRender = true;

User.propTypes={
    username : PropTypes.string.isRequired,
    fullName : PropTypes.string.isRequired,
    // test :PropTypes.number
}

