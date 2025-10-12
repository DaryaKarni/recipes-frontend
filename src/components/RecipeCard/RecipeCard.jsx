import styles from './RecipeCard.module.scss'
import heart from '../../assets/like-heart.svg'
import starEmpty from '../../assets/star-empty.svg'
import starFilled from '../../assets/star-filled.svg'

const RecipeCard = ({recipe, isSmall}) => {
  const renderStars = (rating) => {
    const stars =[];
    for(let i = 1; i <=5; i++){
      if(i <= rating){
        stars.push(<img key={`star-filled-${i}`} src={starFilled} alt=''/>)
      } 
      else{
        stars.push(<img key={`star-empty-${i}`} src={starEmpty} alt=''/>)
      }
    }
    return <div className={styles['ratingContainer']}>{stars}</div>;
  }

   const smallClass = isSmall ? styles['card--small'] : '';
  const cardClasses = `${styles.card} ${smallClass}`; 

  return (
    <div className={cardClasses}>
      <div className={styles['frame']}>
        <div className={styles['image-container']}>
          <img src={recipe.image} alt={recipe.name} className={styles["image"]}/>
          <div className={styles['favorite']}>
            <img src={heart} alt="" className={styles.heart}/>
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
              {renderStars(recipe.rating)}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RecipeCard;