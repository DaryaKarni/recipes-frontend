import styles from "./Popular.module.scss"
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import { useTranslation } from "react-i18next";
import {useState, useEffect, useContext} from "react";
const POPULAR_URL = "/api/v1/recipes/popular";
import axios from "axios";
import AuthContext from "../../context/AuthProvider.jsx";

const Popular = () => {
  const {t} = useTranslation();

  const {auth} = useContext(AuthContext);
  const [popularData, setPopularData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect (() => {
    const fetchPop = async() =>{
      
      try{
        setError(null);
        setIsLoading(true);
        const headers = {};
        if(auth.token){
          headers.Authorization = `Bearer ${auth.token}`;
        }
        const response = await axios.get(POPULAR_URL, {
          headers
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
        {popularData && !isLoading && !error && <BlocksRecipe data={popularData}/>}
      </div>  
    </div>
  )
}

export default Popular