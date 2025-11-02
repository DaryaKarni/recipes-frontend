import Recipe from '../../components/Recipe/Recipe'
import styles from './RecipePage.module.scss'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import imageCupcakes from '../../assets/fake-recipes-images/cupcakes.svg'

import dumplings from '../../assets/fake-recipes-images/dumplings.svg';
import imageRecipe from '../../assets/ratatouille.svg'

const RecipeData = [
  
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
  },
   {
    id: 2, 
    title: 'Пельмешки', 
    authorUsername: 'modory', 
    image: dumplings,
    description: 'Очень вкусные пельмешки', 
    instruction: 'Закипятите воду и закиньте пельмешки', 
    cookingTime: 10, 
    countOfServings: 2, 
    averageRating: 5, 
    commentsCount: 2, 
    ratingCount: 150,
    categoryId: null, 
    categoryName: 'обед', 
    isFavourite: false, 
    userRating: 0,
    ingredientDTOs: [ 
      {id: 101, name: 'Пельмени', amount: 200.0, stringUnit: 'г'},
      {id: 102, name: 'Вода', amount: 1.0, stringUnit: 'л.'},
      {id: 103, name: 'Соль', amount: 0.5, stringUnit: 'ст.л.'},
    ],
    commentDTOs: [ 
        {id: 201, commentText: 'супер', createdAt: null, authorId: null, authorUsername: 'Светлана'},
        {id: 202, commentText: 'лучший рецепт', createdAt: null, authorId: null, authorUsername: 'Василий'},
    ]
  }
]

const RecipePage = () => {
  const {id} = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect (() => {
    if(!id){
      setError("Идентификатор рецепта не найден в URL.");
      setIsLoading(false);
      return;
    }
    const fetchRecipeById = async () => {
      setIsLoading(true);
      setError(null);

      try{
        const response = await fetch(`/api/v1/recipes/${id}`);

        if(!response.ok){
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();

        if(jsonResponse.status === 'success' && jsonResponse.data){
          setRecipe(jsonResponse.data);
        }
        else {
           throw new Error("Recipe data not found.");
        }
      }
      catch (e) {
        console.error("Failed to fetch recipe by ID:", e);
        setError('Не удалось загрузить рецепт. Возможно, его не существует.');
        setRecipe(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipeById();
  }, [id])

  if(isLoading){
    return <div>Загрузка рецепта...</div>;
  }
  if (error || !recipe){
    return <div>{error || 'Рецепт не найден'}</div>
  }
  return (
    <div className={styles.page}>
      <Recipe recipe={recipe}/>
    </div>
  )
}

export default RecipePage