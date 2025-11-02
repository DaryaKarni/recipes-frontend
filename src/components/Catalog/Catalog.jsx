import styles from './Catalog.module.scss'
import heart_icon from '../../assets/fav-heart-icon.svg'
//import {Link} from 'react-router-dom'

const Catalog = () => {
  return (
    <ul className={styles.catalog}>
      
        <a href="/popular">Popular</a>
        <li>Categories</li>
        <a href="/favorite" className={styles['favourites']}>
          <img src={heart_icon} alt="" className={styles['heart-icon']}></img> 
          Favorite
        </a>
     
    </ul>
  )
}

export default Catalog