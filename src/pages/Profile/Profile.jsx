import styles from './Profile.module.scss'
import defaultPhoto from '../../assets/profile-photo-default.svg'
import editIcon from '../../assets/edit-icon.svg'
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import AuthContext  from '../../context/AuthProvider';
import { useContext, useEffect, useState } from 'react';

// const NewRecipesData = [
//   { id: 1, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
//   { id: 2, authorUsername: 'modory', name: 'запечённая рыба', image: fish, meal: 'ужин', time: '90 минут', rating: 3 },
//   { id: 3, authorUsername: 'modory', name: 'хачапури по-аджарски и что то там ещё вкусное', image: khachapuri, meal: 'ужин', time: '45 минут', rating: 4 },
//   { id: 4, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
//   { id: 5, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
//   { id: 6, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  
  
// ];
const MY_RECIPES_URL = '/api/v1/recipes/my-recipes';
const Profile = () => {
  const {auth} = useContext(AuthContext);
  const user = auth?.user;
  const token = auth?.token;
  const [myRecipes, setMyRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propose, setPropose] = useState(false)

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
        setPropose(false);
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
        if(myRecipesArray && myRecipesArray.length === 0){
          setPropose(true);
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
            <img src={defaultPhoto} className={styles["photo"]}/>
          </div>
          <img src={editIcon} className={styles["editIcon"]}></img>
        </div>


          <p className={styles["title"]}>Мои рецепты</p>
          {isLoading && <p>Загрузка ваших рецептов...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!isLoading && !error && propose && (<p>Создайте свой первый рецепт</p>)}
          <div className={styles["recipesBlock"]}>
            {!isLoading && !error && myRecipes && myRecipes.length > 0 && (<BlocksRecipe data={myRecipes} isFavoriteSection={false}/>) }
          </div>

    </div>
      
  )
}

export default Profile