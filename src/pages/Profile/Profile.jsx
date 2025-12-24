import styles from './Profile.module.scss'

import editIcon from '../../assets/edit-icon.svg'
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import AuthContext  from '../../context/AuthProvider';
import { useContext, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';


const MY_RECIPES_URL = '/api/v1/recipes/my-recipes';
const AVATAR_URL = '/api/v1/avatars';

const API_BASE = import.meta.env.VITE_API_URL || 'https://recipes-api.poma.dev';

const Profile = () => {
  const {t} = useTranslation();
  const {auth, setAuth} = useContext(AuthContext);
  const user = auth?.user;
  const token = auth?.token;
  const [myRecipes, setMyRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propose, setPropose] = useState(null);
  const proposeText = t("propose");

  const fileInputRef = useRef(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(null);

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

  useEffect(()=> {
    if(myRecipes && myRecipes.length === 0){
      setPropose(proposeText);
    }
  },[myRecipes, proposeText]);

   const handleEditClick = () => {
    if (!token) return;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadAvatar = async (file) => {
    if (!token || !file) return;
    setAvatarLoading(true);
    setAvatarError(null);

    try {
      // если аватар уже есть — сначала удаляем
      if (auth.avatar) {
        const delResp = await fetch(AVATAR_URL, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!delResp.ok) {
          console.error('Не удалось удалить старый аватар', await delResp.text());
        }
      }

      const formData = new FormData();
      formData.append('image', file); // имя поля подгони под Swagger

      const response = await fetch(AVATAR_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          // Content-Type НЕ ставим — его проставит браузер для multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Ошибка загрузки аватара', response.status, text);
        setAvatarError('Не удалось загрузить аватар. Попробуйте ещё раз.');
        return;
      }

      const data = await response.json();
      const newAvatar = data.data; // имя файла

      setAuth((prev) => ({
        ...prev,
        avatar: newAvatar,
      }));

    } catch (e) {
      console.error('Сбой при загрузке аватара', e);
      setAvatarError('Не удалось загрузить аватар. Попробуйте ещё раз.');
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadAvatar(file);
    e.target.value = '';
  };

  return (
    <div className={styles.profile}>
      <div className={styles["headerBlock"]}>
        <p className={styles["header"]}>
          {t("myProfile_title")}
        </p>
      </div>
        <div className={styles["profileBlock"]}>
          <div className={styles["username"]}>
            {user}
          </div>
        
           <div className={styles['imageFrame']}>
          {auth.avatar && (
      

          <img
            src={`${API_BASE.replace(/\/$/, '')}/uploads/avatars/${auth.avatar}`}
            className={styles.photo}
            alt="Аватар"
          />

          )}
        </div>

        <button
          type="button"
          className={styles['editButton']}
          onClick={handleEditClick}
          disabled={avatarLoading}
        >
          <img src={editIcon} className={styles['editIcon']} alt="Изменить аватар" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        </div>


          {avatarLoading && <p className={styles.info}>Загрузка аватара...</p>}
          {avatarError && <p className={styles.error}>{avatarError}</p>}

          <p className={styles['title']}>{t('myRecipes_title')}</p>
          {isLoading && <p>{t('loading_your_recipes')}</p>}
          {error && <p className={styles['error']}>{error}</p>}
          {!isLoading && !error && propose && <p>{propose}</p>}
          <div className={styles["recipesBlock"]}>
            {!isLoading && !error && myRecipes && myRecipes.length > 0 && (<BlocksRecipe data={myRecipes}/>) }
          </div>

    </div>
      
  )
}

export default Profile