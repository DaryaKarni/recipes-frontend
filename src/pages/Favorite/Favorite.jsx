import styles from './Favorite.module.scss'
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const FAV_URL = '/api/v1/recipes/favourites';

const Favorite = () => {
  const {t} = useTranslation();
  const {auth} = useContext(AuthContext);
  const token = auth?.token;
  const [favData, setFavData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [propose, setPropose] = useState(null);
  const proposeText = t("get_fav");
  useEffect (() => {
    const fetchFav = async() =>{
      if(!token){
        setIsLoading(false);
        setFavData(null);
        setError("Для просмотра любимых рецептов войдите в сестему");
      }
      try{
        setError(null);
        setIsLoading(true);
        setPropose(null);
        const response = await axios.get(FAV_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const myFavArray = response.data.data;
        setFavData(myFavArray);
        console.log(myFavArray);
        if(myFavArray && myFavArray.length === 0){
          setPropose(proposeText);
          console.log(propose);
        }
      }
      catch(e){
        if(axios.isAxiosError(e) && e.response?.status === 401){
          console.warn('Fav recipes fetch failed: Token expired. Forcing logout');
        }
      }
      finally{
        setIsLoading(false);
      }
    }
    if(token){
      fetchFav();
    }
  }, [token]);
  return (
    <div className={styles.favorite}>
      <div className={styles["fav-recipes-title"]}>
        <p>{t("myFav_title")}</p>
      </div> 
      {isLoading && <p>{t("loading_fav")}</p>}
      {error && <p className={styles["error"]}>{error}</p>}
      {!isLoading && !error && propose && <p>{propose}</p>}
      <div className={styles["fav-recipes"]}>
        {favData && !isLoading && !error && favData.length > 0 && <BlocksRecipe data={favData} isFavoriteSection={true}/>}
      </div>  
    </div>
  )
}

export default Favorite