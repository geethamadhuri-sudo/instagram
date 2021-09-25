import PropTypes from 'prop-types'

export default function image({src,caption}){
   return(
       <img src={src} alt={caption}/>
   )
}
image.propTypes={
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}