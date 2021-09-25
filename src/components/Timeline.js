import Skelton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './post';

export default function Timeline(){
     //we need to get the logged in user's photos(hook)p
     const {photos}=usePhotos();
     //on Loading the photos ,we need to use react seklton.
          return <div className="container col-span-2">
          {
          !photos ? (
                    <>
                    {
                         [...new Array(4)].map((_,index)=>(
                              <Skelton key={index} count={1} 
                              width={500} height={400} className="mb-5"/>
                         ))
                    }
                    </>
               ):( photos?.length > 0 ? (
                    photos.map((content)=> <Post key={content.docId} content={content}/> )
               ):(
                    <p className="text-center text-2xl">Follow people to see photos !</p>
               ))
          }
     </div>

     //if we have photos ,render them (create a post component)
     //if the user has no photos ,tell them to create some photos

}
