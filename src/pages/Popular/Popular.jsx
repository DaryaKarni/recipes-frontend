import styles from "./Popular.module.scss"
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
const POPULAR_URL = "/api/v1/recipes/popular";
import axios from "axios";

const Popular = () => {
  const {t} = useTranslation();

  //const {auth} = useContext(AuthContext);
  //const token = auth?.token;
  const [popularData, setPopularData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect (() => {
    const fetchPop = async() =>{
      
      try{
        setError(null);
        setIsLoading(true);
        const response = await axios.get(POPULAR_URL, {
          headers: {
            //'Authorization': `Bearer ${token}`
          }
        });
        console.log('API response:', response.data);
        const popularArray = response.data.data;
        setPopularData(popularArray);
      }
      catch(e){
        console.error('Failed to fetch popular', e);
      }
      finally{
        setIsLoading(false);
      }
    }
    
    fetchPop();
    
  }, []);
  return (
    <div className={styles.popular}>
      <div className={styles["popular-recipes-title"]}>
        <p>{t("popular_title")}</p>
      </div> 
      {isLoading && <p>{t("loading_popular")}</p>}
      {error && <p className={styles["error"]}>{error}</p>}
      <div className={styles["popular-recipes"]}>
        {popularData && !isLoading && !error && <BlocksRecipe data={popularData} isFavoriteSection={false}/>}
      </div>  
    </div>
  )
}

export default Popular