import styles from './Catalog.module.scss'
import heart_icon from '../../assets/fav-heart-icon.svg'
import {Link} from 'react-router-dom'

const Catalog = () => {
  const popularRus = "Популярное";
  const categoriesRus = "Категории";
  const favoriteRus = "Избранное";
  return (
    <ul className={styles.catalog}>
      
        <Link to="/popular">{popularRus}</Link>
        <li>{categoriesRus}</li>
        <Link to="/favorite" className={styles['favourites']}>
          <img src={heart_icon} alt="" className={styles['heart-icon']}></img> 
          {favoriteRus}
        </Link>
     
    </ul>
  )
}

export default Catalog