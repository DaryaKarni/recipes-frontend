import styles from './Home.module.scss'
import background from '../../assets/background-recipe-of-the-day.svg'
import imageRecipe from '../../assets/ratatouille.svg'
import RecipeCard from '../../components/RecipeCard/RecipeCard'

import dumplings from '../../assets/fake-recipes-images/dumplings.svg';
import fish from '../../assets/fake-recipes-images/fish.svg';
import khachapuri from '../../assets/fake-recipes-images/khachapuri.svg';
import Button from '../../components/Button/Button';
import { useTranslation } from 'react-i18next';

import {useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';


const Home = () => {
  //const dayRecipe = DayRecipeData[0];
  const {t} = useTranslation();


  const navigate = useNavigate();


  const [dayRecipe, setDayRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newRecipes, setNewRecipes] = useState(null);
  const [isNewLoading, setNewIsLoading] = useState(true);
  const [newError, setNewError] = useState(null);
  useEffect (() => {
    const fetchDayRecipe = async () => {
      try{
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/v1/recipes/recipe-of-the-day');

        if(!response.ok){
          throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setDayRecipe(jsonResponse.data);
      }
      catch(e){
        console.error("Failed to fetch recipe:", e);
        setError('Не удалось загрузить рецепт дня. Попробуйте обновить страницу.');
        setIsLoading(false);
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchDayRecipe();

  }, []);

  useEffect (() => {
    const fetchNewRecipes = async () => {
      try{
        setNewIsLoading(true);
        setNewError(null);
        const response = await fetch('/api/v1/recipes/recent');

        if(!response.ok){
          throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        setNewRecipes(jsonResponse.data);
      }
      catch(e){
        console.error("Failed to fetch recipe:", e);
        setNewError('Не удалось загрузить рецепт дня. Попробуйте обновить страницу.');
        setNewIsLoading(false);
      }
      finally{
        setNewIsLoading(false);
      }
    };
    fetchNewRecipes();

  }, []);

  const HandleClickToRecipe = () => {
    if (dayRecipe && dayRecipe.id !== undefined) {
      navigate(`/recipe/${dayRecipe.id}`)
    }
    else {
    // 💡 Добавьте console.log для отладки
    console.log("Navigation prevented: dayRecipe is null or ID is missing.", dayRecipe);
  }
  }

  if (isLoading) {
    return <div className={styles.home}><p style={{textAlign: 'center', padding: '50px'}}>{t("loading_dayRecipe")} ⏳</p></div>;
  }

  if (error) {
    return <div className={styles.home}><p style={{textAlign: 'center', padding: '50px', color: 'red'}}>{error} 😢</p></div>;
  }

  if (!newRecipes) {
    return <div className={styles.home}><p style={{textAlign: 'center', padding: '50px'}}>{t("unavailable_newRecipes")} 😔</p></div>;
  }

  if (isNewLoading) {
    return <div className={styles.home}><p style={{textAlign: 'center', padding: '50px'}}>{t("loading_newRecipes")} ⏳</p></div>;
  }

  if (newError) {
    return <div className={styles.home}><p style={{textAlign: 'center', padding: '50px', color: 'red'}}>{newError} 😢</p></div>;
  }

  if (!newRecipes) {
    return <div className={styles.home}><p style={{textAlign: 'center', padding: '50px'}}>{t("unavailable_dayRecipe")} 😔</p></div>;
  }

  return (
    <div className={styles.home}>
      <div className={styles["day-recipe"]}>
        <div className={styles["recipe"]}>
          {dayRecipe && <img src={`/uploads/recipes/${dayRecipe.image}`} alt="" className={styles["imageRecipe"]}/>}
          <div className={styles['info']}>
            <p className={styles['name']}>
              {dayRecipe && dayRecipe.title}
            </p>
            <p className={styles['description']}>
              {dayRecipe && dayRecipe.description}
            </p>
            <Button buttonName={t("button_toRecipe")} className={styles["button"]} onClick={HandleClickToRecipe}/>
          </div>

        </div>
        <div className={styles["background"]}>
          <img src={background} alt=""></img>
          <p className={styles["title"]}>{t("dayRecipe_title")}</p>
        </div>
      </div>

      <div className={styles["new-recipes-title"]}>
        {t("newRecipes_title")}
      </div>

      <div className={styles["new-recipes"]}>
        <div className={styles["new-recipes-cards"]}>
          {newRecipes && newRecipes.map((recipe) => (
            <RecipeCard
              key = {recipe.id}
              recipe= {recipe}
              isSmall={false}
              //isFavoriteSection={false}
              />
          ))}
          </div>
        </div>

    </div>
  )
}

export default Home
