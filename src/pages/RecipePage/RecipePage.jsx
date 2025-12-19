import Recipe from '../../components/Recipe/Recipe'
import styles from './RecipePage.module.scss'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'

const RecipePage = () => {

  const {id} = useParams();
  const {t} = useTranslation();
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
  }, [id]);

  return (
    <div className={styles.page}>
      <div  className={styles["message"]}>
        {isLoading && <p>{t("loading_recipe")}</p>}
        {error && <p>{error || t("error_recipe")}</p>}
      </div>
      {recipe && <Recipe recipe={recipe}/>}
    </div>
  )
}

export default RecipePage