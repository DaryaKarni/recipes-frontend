import {useContext, useState} from 'react'
import starEmpty from '../assets/star-empty-interactive.svg'
import starFilled from '../assets/star-filled-interactive.svg'
import { useModal } from '../context/ModalContext'
import AuthContext from '../context/AuthProvider'


const StarRatingInteractive = ({initialRating = 0, onRatingChange}) => {

const [rating, setRating] = useState(initialRating)
const [hoverRating, setHoverRating] = useState(0);
const displayRating = hoverRating || rating;

const {openSignIn} = useModal();
const {auth} = useContext(AuthContext);
const token = auth?.token;

const handleClick = (clickedRating) => {
  if(!token){
    openSignIn();
    return;
  }
  setRating(clickedRating);
  if(onRatingChange){
    onRatingChange(clickedRating);
  }
}

const handleMouseEnter = (hoveredRating) => {
  setHoverRating(hoveredRating);
} 

const handleMouseLeave = () => {
  setHoverRating(0);
}

const stars = [];
for(let i = 1; i <= 5; ++i){
  const isFilled = i <= displayRating
  const iconSrc = isFilled ? starFilled : starEmpty;
  stars.push(
  <img
    key = {i}
    src = {iconSrc}
    onClick={() => handleClick(i)}
    onMouseEnter = {() => handleMouseEnter(i)}
    onMouseLeave = {handleMouseLeave}
  />
  );
}
return (
  <div>{stars}</div>
)
}
export default StarRatingInteractive