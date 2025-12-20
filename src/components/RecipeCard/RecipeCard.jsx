import {useContext, useEffect, useState} from 'react'
import styles from './RecipeCard.module.scss'
import heartFilled from '../../assets/like-heart-filled.svg'
import heartEmpty from '../../assets/like-heart-empty.svg'
import { useNavigate } from 'react-router-dom'
import StarRating from '../StarRating'
import axios from 'axios'
import AuthContext from '../../context/AuthProvider';
import {useModal} from '../../context/ModalContext'
import SignInWindow from '../SignInWindow/SignInWindow'

const RecipeCard = ({recipe, isSmall}) => {
  const [isLiked, setIsLiked] = useState(recipe.isFavourite ?? false);
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);
  const token = auth?.token;
  const {isSignInOpen, openSignIn, closeSignIn} = useModal();
  const [isMounted, setIsMounted] = useState(false); 
  const heartIcon = isLiked ? heartFilled : heartEmpty;
  const HandleLikeToggle = (event) =>{
    event.stopPropagation();
    if(!auth?.token){
      openSignIn();
      return;
    }
    else{
      setIsLiked(prevIsLiked => !prevIsLiked);
    }
  }
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    if (!auth?.token) return;
    const putIsLiked = async() => {

      try{
        await axios.put( 
          `/api/v1/favorites/${recipe.id}`,
          {isFavourite: isLiked},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
      } 
      catch(e){
        console.error('Failed to update favorite', e);
        setIsLiked(recipe.isFavourite ?? false);
      }
    }
    putIsLiked();
    console.log(recipe);
  }, [isLiked, auth?.token]);

  const HandleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  }

  
  const smallClass = isSmall ? styles['card--small'] : '';
  const cardClasses = `${styles.card} ${smallClass}`;

  return (
    <div className={cardClasses} onClick={HandleCardClick}>
      <div className={styles['frame']}>
        <div className={styles['image-container']}>
          <img src={`/uploads/recipes/${recipe.image}`} alt={recipe.title} className={styles["image"]}/>
          <div className={styles["favorite"]}>
            <img src={heartIcon} 
            alt="" 
            onClick={HandleLikeToggle}/>
          </div>
        </div>
        <div className={styles['info']}>
          <div className={styles['name']}>
            <p>{recipe.title}</p>
          </div>
          <div className={styles['content']}>
            <div className={styles['text']}>
              <p className={styles['meal']}>{recipe.categoryName}</p>
              <p className={styles['time']}>{`${recipe.cookingTime} минут`}</p>
            </div>
            <div className={styles['rating']}>
              <StarRating
                rating = {recipe.averageRating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RecipeCard;
