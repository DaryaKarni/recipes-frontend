import styles from './Catalog.module.scss'
import heart_icon from '../../assets/fav-heart-icon.svg'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Catalog = () => {
  const {t} = useTranslation();
  return (
    <ul className={styles.catalog}>
      
        <Link to="/popular">{t("popular_title")}</Link>
        <li>{t("category_title")}</li>
        <Link to="/favorite" className={styles['favourites']}>
          <img src={heart_icon} alt="" className={styles['heart-icon']}></img> 
          {t("favorite_title")}
        </Link>
     
    </ul>
  )
}

export default Catalog