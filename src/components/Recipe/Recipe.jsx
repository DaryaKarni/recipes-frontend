import styles from './Recipe.module.scss'
import imageCupcakes from '../../assets/fake-recipes-images/cupcakes.svg'
import heart from '../../assets/fav-icon-for-recipe.svg'
import comment from '../../assets/comment-icon.svg'
import StarRating from '../StarRating'
import Ingredient from '../Ingredient/Ingredient'
import StarRatingInteractive from '../StarRatingInteractive'
import Comment from '../Comment/Comment'
import Button from '../Button/Button'
const RecipeData = 
  {
    id: 1, 
    title: 'Кексы с кабачком', 
    authorUsername: 'kinkate', 
    image: imageCupcakes,
    description: 'Кексы с кабачком в духовке', 
    instruction: 'Натрите кабачок на терке и отожмите. Взболтайте 1 крупное яйцо с сахаром, оливковым маслом и ванильным экстрактом. В отдельной миске смешайте муку, соль, разрыхлитель и соду. Соедините все ингредиенты, добавьте тертый кабачок, цедру и сок лимона. Перемешайте. Разложите тесто по бумажным капсулам в форме для кексов (смажьте их). Выпекайте около 20-25 минут при 180°C. Проверьте зубочисткой – она должна выходить без следов теста.', // из раздела "Приготовление"
    cookingTime: 90, 
    countOfServings: 4, 
    averageRating: 3, 
    commentsCount: 59, 
    ratingCount: 1000,
    categoryId: null, 
    categoryName: 'десерт', 
    isFavourite: false, 
    userRating: 0,
    ingredientDTOs: [ 
      {id: 101, name: 'Кабачок', amount: 170.0, stringUnit: 'г'},
      {id: 102, name: 'Лимон', amount: 1.0, stringUnit: 'шт.'},
      {id: 103, name: 'Коричневый сахар', amount: 160.0, stringUnit: 'г'},
      {id: 104, name: 'Оливковое масло', amount: 125.0, stringUnit: 'мл.'},
      {id: 105, name: 'Ванильный экстракт', amount: 1.0, stringUnit: 'ч.л.'},
      {id: 106, name: 'Крупное яйцо', amount: 1.0, stringUnit: 'шт.'},
      {id: 107, name: 'Мука', amount: 130.0, stringUnit: 'г'},
      {id: 108, name: 'Соль', amount: 0.25, stringUnit: 'ч.л.'},
      {id: 109, name: 'Разрыхлитель', amount: 0.75, stringUnit: 'ч.л.'},
      {id: 110, name: 'Сода', amount: 0.25, stringUnit: 'ч.л.'}, 
    ],
    commentDTOs: [ 
        {id: 201, commentText: 'ммм балдеж', createdAt: null, authorId: null, authorUsername: 'Светлана'},
        {id: 202, commentText: 'Сегодня мы будем готовить мои любимые фритатататататато для этого мне понадобятся мои любимые помидорки мой любимый перчик и мои любимые яйца а где яйца инвалид где мои яйца м где мои яйца где мои яйца всё есть где мои яйца где мои яйца', createdAt: null, authorId: null, authorUsername: 'Шеф'},
    ]
  }

const Recipe = ({recipe}) => {
  const username = 'kinkate'
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
            автор: {recipe.authorUsername}
          </p>
        </div>
        <div className={styles["cardImage"]}>
          <img src={recipe.image} alt="" className={styles["image"]}/>
        </div>
        <div className={styles["ratingInfo"]}>
          <img src={heart}/>
          <div className= {styles["comments"]}>
            <p>{recipe.commentsCount}</p>
            <img src={comment}/>
          </div>
          <div className= {styles["rating"]}>
            <p>{recipe.ratingCount}</p>
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
            initialRating = {recipe.userReting}
            onRatingChange={handleNewRating}
          />
        </div>
        <div className={styles["commentSection"]}>
            <div className={styles["personalComment"]}>
              <div className={styles["comment"]}>
                 <Comment 
                  authorUsername={username}
                  //commentText={'Добавить комментарий'}
                  isPersonal = {true}
              /> 
              </div>
             <div className={styles["button"]}>
              <Button buttonName = {'отправить'} />
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