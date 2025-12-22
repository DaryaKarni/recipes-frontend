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
  const [isLiked, setIsLiked] = useState(recipe.isFavourite || false);
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);
  const token = auth?.token;
  const {isSignInOpen, openSignIn, closeSignIn} = useModal();
  const heartIcon = isLiked ? heartFilled : heartEmpty;
  const HandleLikeToggle = (event) =>{
    event.stopPropagation();
    if(!auth?.token){
      openSignIn();
      return;
    }
    else {
      setIsLiked(prevIsLiked => {
        const updatedIsLiked = !prevIsLiked
        const updateIsLiked = async () => {
          try {
            const url = `/api/v1/favorites/${recipe.id}`
            const config = {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
            if (updatedIsLiked) {
              await axios.post(url, {}, config)
            } else {
              await axios.delete(url, config)
            }
          } catch (e) {
            console.error('Failed to update favorite', e);
          }
        }
        updateIsLiked();
        return updatedIsLiked
      });
    }
  }

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
