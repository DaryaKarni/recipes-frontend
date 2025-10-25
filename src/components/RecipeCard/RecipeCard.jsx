import {useState} from 'react'
import styles from './RecipeCard.module.scss'
import heartFilled from '../../assets/like-heart-filled.svg'
import heartEmpty from '../../assets/like-heart-empty.svg'

import StarRating from '../StarRating'

const RecipeCard = ({recipe, isSmall, isFavorite = false}) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const HandleLikeToggle = (event) =>{
    event.stopPropagation();
    setIsLiked(prevIsLiked => !prevIsLiked);

  }
  const heartIcon = isLiked ? heartFilled : heartEmpty;

  const smallClass = isSmall ? styles['card--small'] : '';
  const cardClasses = `${styles.card} ${smallClass}`; 

  return (
    <div className={cardClasses}>
      <div className={styles['frame']}>
        <div className={styles['image-container']}>
          <img src={recipe.image} alt={recipe.name} className={styles["image"]}/>
          <div className={styles['favorite']} onClick={HandleLikeToggle}>
            <img src={heartIcon} alt="" className={styles.heart}/>
          </div>
        </div>
        <div className={styles['info']}>
          <div className={styles['name']}>
            <p>{recipe.name}</p>
          </div>
          <div className={styles['content']}>
            <div className={styles['text']}>
              <p className={styles['meal']}>{recipe.meal}</p>
              <p className={styles['time']}>{recipe.time}</p>
            </div>
            <div className={styles['rating']}>
              <StarRating
                rating = {recipe.rating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RecipeCard;