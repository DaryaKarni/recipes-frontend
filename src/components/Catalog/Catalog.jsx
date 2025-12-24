import styles from './Catalog.module.scss'
import heart_icon from '../../assets/fav-heart-icon.svg'
import {Link, useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import AuthContext from '../../context/AuthProvider'
import { useModal } from '../../context/ModalContext'

const Catalog = () => {
  const {t} = useTranslation();
  const {auth} = useContext(AuthContext);
  const token = auth?.token;
  const {isSignInOpen, openSignIn, closeSignIn} = useModal();
  const navigate = useNavigate();
  const handleFavClick = () => {
    console.log(token);
    if(!token){
      openSignIn();
      return;
    }
    navigate("/favorite");
  }
  return (
    <ul className={styles.catalog}>
      
        <Link to="/popular">{t("popular_title")}</Link>
        <li>{t("category_title")}</li>
        <li className={styles['favourites']} onClick={handleFavClick}>
          {t("favorite_title")}
        </li>
     
    </ul>
  )
}

export default Catalog