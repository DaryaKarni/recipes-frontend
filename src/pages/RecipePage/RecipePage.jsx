import Recipe from '../../components/Recipe/Recipe'
import styles from './RecipePage.module.scss'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'

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