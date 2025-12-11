import styles from './Recipe.module.scss'
import imageCupcakes from '../../assets/fake-recipes-images/cupcakes.svg'
import heart from '../../assets/fav-icon-for-recipe.svg'
import comment from '../../assets/comment-icon.svg'
import StarRating from '../StarRating'
import Ingredient from '../Ingredient/Ingredient'
import StarRatingInteractive from '../StarRatingInteractive'
import Comment from '../Comment/Comment'
import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import AuthContext from '../../context/AuthProvider'

const Recipe = ({recipe}) => {
  const {t} = useTranslation();
  const {auth} = useContext(AuthContext);
  const handleNewRating = (newRating) => {
    console.log('new rating:', newRating)
  }
  return (
    <div className={styles["recipe"]}>

      <div className={styles["preview"]}>
        <div className={styles["header"]}>
          <p className = {styles["category"]}>
            #{recipe.categoryName}
          </p>
          <p className = {styles["title"]}>
            {recipe.title}
          </p>
          <p className = {styles["author"]}>
            {t("author")}: {recipe.authorUsername}
          </p>
        </div>
        <div className={styles["cardImage"]}>
          <img src={`/uploads/recipes/${recipe.image}`} alt="" className={styles["image"]}/>
        </div>
        <div className={styles["ratingInfo"]}>
          <img src={heart}/>
          <div className= {styles["comments"]}>
            <p>{recipe.commentsCount}</p>
            <img src={comment}/>
          </div>
          <div className= {styles["rating"]}>
            <p>{recipe.countOfRatings}</p>
            <StarRating
              rating = {recipe.averageRating}
            />
          </div>
        </div>
      </div>

      <div className={styles["info"]}>
        <div className={styles["description"]}>
          <p className={styles["title"]}>Описание</p>
          <p className={styles["text"]}>{recipe.description}</p>
        </div>
        <div className={styles["cookingTime"]}>
          <p className={styles["title"]}>Время приготовления</p>
          <div className={styles["general"]}>
            <p className={styles["text"]}>Общее</p>
            <p className={styles["time"]}>{recipe.cookingTime} мин</p>
          </div>
        </div>
        <div className={styles["countOfServings"]}>
           <p className={styles["title"]}>Количество порций</p>
           <p className={styles["count"]}>{recipe.countOfServings}</p>
        </div>
        <div className={styles["ingredients"]}>
            <p className={styles["title"]}>Ингредиенты</p>
            {recipe.ingredientDTOs.map((ingredient) => (
              <Ingredient
                key = {ingredient.id}
                name = {ingredient.name}
                amount = {ingredient.amount}
                unit = {ingredient.stringUnit}
              />
            ))}
        </div>
        <div className={styles["cooking"]}>
          <p className={styles["title"]}>Приготовление</p>
          <p className={styles["text"]}>{recipe.instruction}</p>
        </div>
      </div>

      <div className={styles["feetbackSection"]}>
        <div className={styles["whiteBlock"]}></div>
        <div className={styles["header"]}>
          <p className={styles["title"]}>Комментарии</p>
        </div>
        <div className={styles["rateRecipe"]}>
          <p className={styles["title"]}>Оценить рецепт</p>
          <StarRatingInteractive
            initialRating = {recipe.userRating}
            onRatingChange={handleNewRating}
          />
        </div>
        <div className={styles["commentSection"]}>
            <div className={styles["personalComment"]}>
              <div className={styles["comment"]}>
                 <Comment
                  authorUsername={auth?.user || t("guest")}
                  //commentText={'Добавить комментарий'}
                  isPersonal = {true}
              />
              </div>
             <div className={styles["button"]}>
              <Button 
        
              buttonName = {'отправить'} 
              />
              </div>
            </div>
            <div className={styles["comments"]}>
             {recipe.commentDTOs.map((comment) => (
              <Comment
                key = {comment.id}
                authorUsername={comment.authorUsername}
                initialText = {comment.commentText}
                isPersonal = {false}
              />
             ))}
            </div>
        </div>
      </div>

    </div>
  )
}

export default Recipe
