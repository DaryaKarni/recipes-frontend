import {useState} from 'react'
import styles from './RecipeCard.module.scss'
import heartFilled from '../../assets/like-heart-filled.svg'
import heartEmpty from '../../assets/like-heart-empty.svg'

import { useNavigate } from 'react-router-dom'
import StarRating from '../StarRating'

const RecipeCard = ({recipe, isSmall, isFavorite = false}) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const navigate = useNavigate();
  const HandleLikeToggle = (event) =>{
    event.stopPropagation();
    setIsLiked(prevIsLiked => !prevIsLiked);

  }

  const HandleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  }

  const heartIcon = isLiked ? heartFilled : heartEmpty;
  const smallClass = isSmall ? styles['card--small'] : '';
  const cardClasses = `${styles.card} ${smallClass}`;

  return (
    <div className={cardClasses} onClick={HandleCardClick}>
      <div className={styles['frame']}>
        <div className={styles['image-container']}>
          <img src={`/uploads/recipes/${recipe.image}`} alt={recipe.title} className={styles["image"]}/>
          <div className={styles['favorite']} onClick={HandleLikeToggle}>
            <img src={heartIcon} alt="" className={styles.heart}/>
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
