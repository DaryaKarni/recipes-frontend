import styles from './Profile.module.scss'

import editIcon from '../../assets/edit-icon.svg'
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import AuthContext  from '../../context/AuthProvider';
import { useContext, useEffect, useState } from 'react';


const MY_RECIPES_URL = '/api/v1/recipes/my-recipes';
const Profile = () => {
  const {auth} = useContext(AuthContext);
  const user = auth?.user;
  const token = auth?.token;
  const [myRecipes, setMyRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propose, setPropose] = useState(null);
  const proposeTextRus = 'Создайте свой первый рецепт';

  useEffect (() => {
    const fetchMyRecipes = async() => {
      if(!token){
        setIsLoading(false);
        setError('Для просмотра рецептов необходимо войти в систему.');
        setMyRecipes(null);
        return;
      }
      try{
        setIsLoading(true);
        setError(null);
        setPropose(null);
        const response = await fetch(MY_RECIPES_URL,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if(!response.ok){
          if (response.status === 401) {
            throw new Error("Сессия истекла. Пожалуйста, войдите снова.");
          }
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const myRecipesArray = jsonResponse.data;
        setMyRecipes(myRecipesArray);
        console.log({myRecipes});
        if(myRecipesArray && myRecipesArray.length === 0){
          setPropose(proposeTextRus);
        }
      }
      catch(e){
        console.error('Failed to fetch my recipes!', e);
        setError("Не удалось загрузить ваши рецепты. Попробуйте обновить страницу.");
      }
      finally{
        setIsLoading(false);
      }
    } 
    if(token){
      fetchMyRecipes();
    }
  }, [token]);

  return (
    <div className={styles.profile}>
      <div className={styles["headerBlock"]}>
        <p className={styles["header"]}>
          Мой профиль
        </p>
      </div>
        <div className={styles["profileBlock"]}>
          <div className={styles["username"]}>
            {user}
          </div>
        
          <div className={styles["imageFrame"]}>
            {auth.avatar && <img src={`/uploads/avatars/${auth.avatar}`} className={styles["photo"]}/>}
          </div>
          <img src={editIcon} className={styles["editIcon"]}></img>
        </div>


          <p className={styles["title"]}>Мои рецепты</p>
          {isLoading && <p>Загрузка ваших рецептов...</p>}
          {error && <p className={styles["error"]}>{error}</p>}
          {!isLoading && !error && propose && <p>{propose}</p>}
          <div className={styles["recipesBlock"]}>
            {!isLoading && !error && myRecipes && myRecipes.length > 0 && (<BlocksRecipe data={myRecipes} isFavoriteSection={false}/>) }
          </div>

    </div>
      
  )
}

export default Profile