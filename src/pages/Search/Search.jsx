import styles from "./Search.module.scss"
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';
import { useTranslation } from "react-i18next";
import {useState, useEffect, useContext} from "react";
const SEARCH_URL = "/api/v1/recipes/title";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import AuthContext from "../../context/AuthProvider.jsx";

const Search = () => {
  const {t} = useTranslation();

  const {auth} = useContext(AuthContext);
  const token = auth?.token;
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const[searchParams] = useSearchParams();//
  const query = searchParams.get("q");//
   console.log("RENDER Search component. Query param is:", query); 
  useEffect (() => {
    const fetchSearch = async() =>{
      if (!query) {
          setIsLoading(false);
          setSearchData([]);
          return;
      }
      setError(null);
      setIsLoading(true);
      try{
        console.log("Отправляю запрос на:", SEARCH_URL, "с параметром title=", query); // ЛОГ 1
        const headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`
        }
        const response = await axios.get(SEARCH_URL, {
          params: {
            title: query,
          },
          headers
        });
        console.log('FULL API response:', response); // Весь объект ответа
// Тепло ответа
        console.log('API response:', response.data);
        const searchArray = response.data.data;
        setSearchData(searchArray);
      }
      catch(e){
        console.error('Failed to fetch search', e);
      }
      finally{
        setIsLoading(false);
      }
    }
    
    fetchSearch();
    
  }, [query]);//
  return (
    <div className={styles.search}>
      <div className={styles["search-recipes-title"]}>
        <p>{t("search_title")}</p>
      </div> 
      {isLoading && <p>{t("loading_search")}</p>}
      {!isLoading && (error || !searchData || searchData.length === 0) && <p className={styles["error"]}>{error || t("no_results")}</p>}
      <div className={styles["search-recipes"]}>
        {searchData && searchData.length > 0 && !isLoading && !error && <BlocksRecipe data={searchData} />}
      </div>  
    </div>
  )
}

export default Search