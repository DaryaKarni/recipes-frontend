import styles from'./Navbar.module.scss'
import search_icon from '../../assets/search-icon.svg'
import line_sign_in from '../../assets/line-sign-in.svg'
import { useContext, useState, useEffect } from 'react';
import RegistWindow from '../RegistWindow/RegistWindow';
import SignInWindow from '../SignInWindow/SignInWindow';
import AuthContext from '../../context/AuthProvider';
import LogoutWindow from '../LogoutWindow/LogoutWindow';
import {Link, useNavigate, useSearchParams, useLocation} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import { useLanguageSync } from '../../context/useLanguageSync';
import { useModal } from '../../context/ModalContext';

//import {Link} from 'react-router-dom'

const Navbar = () => {
  const {auth, setAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const {nextLang, syncLanguageWithBackend} = useLanguageSync();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const location = useLocation();

  const {isSignInOpen, openSignIn, closeSignIn} = useModal();

  const handleLanguageToggle = () => {
    syncLanguageWithBackend(nextLang);
  }

  const handleLogout = () => {
    setAuth({ user: null, role: null, accessToken: null });
    localStorage.removeItem('token');
  }

  const isAdmin = Array.isArray(auth?.roles) 
    ? auth.roles.includes('ADMIN')
    : auth?.roles === 'ADMIN';

  const [isRegistOpen, setIsRegistOpen] = useState(false);
  const openRegist = () => setIsRegistOpen(true);
  const closeRegist = () => setIsRegistOpen(false);


  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const openLogout = () => setIsLogoutOpen(true);
  const closeLogout= () => setIsLogoutOpen(false);

  useEffect (() => {
    if(location.pathname !== '/search'){
      setQuery("");
    }
  }, [location.pathname]);


  const handleSearch = (e) => {
    if((e.key == "Enter" || e.type == 'click') && query.trim()){
      const url = `/search?q=${encodeURIComponent(query.trim())}`;
      navigate(url);
    }
  }
  return (
    <div className={styles.navbar}>
      <div className={styles['home-bar']}>
        <Link to="/" className={styles['recipies-home']}>recipies</Link>
      </div>
      <div className={styles['search-box']}>
        <input 
        type="text" 
        placeholder={t('search')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        />
        <img 
        src={search_icon} 
        alt="" 
        className={styles['search-icon']}
        onClick = {handleSearch}
        /> 
      </div>
      <div className={styles["nav-actions"]}>
      {auth?.token ? (
        <ul className={styles["userPanel"]}> 
          <li className={styles["userInfo"]}>
            {auth.user}
            <Link to="/profile">
              <div className={styles["avatarFrame"]}>
               {auth.avatar && <img src={`/uploads/avatars/${auth.avatar}`} className={styles["avatarImg"]}/>}{/* надо вытянуть аватар`/uploads/avatars/${auth.user.}`*/}
              </div>
            </Link>
          </li>
            <img src={line_sign_in} alt="" className={styles['line-sign-in']}/>
            <li onClick={openLogout} className={styles['signOut']}>{t('button_logout')}</li>
            {/* {isLogoutOpen &&
             <LogoutWindow 
            onClose={closeLogout}
            onButton={handleLogout}/>} */}
        </ul>
      ) : (
      <ul className={styles['sign-in']}>
        <li onClick={openRegist}>{t('button_registrate')}</li>
        {/* {isRegistOpen && <RegistWindow onClose={closeRegist}/>} */}
        <img src={line_sign_in} alt="" className={styles['line-sign-in']}/>
        <li onClick={openSignIn}>{t('button_login')}</li>
        {/*{isSignInOpen && <SignInWindow onClose={closeSignIn}/>}*/}
      </ul>
      )}
      <button 
      className={styles['button-lang']}
      onClick={handleLanguageToggle}
      >{t('button_lang')}</button>
      </div>

     {isRegistOpen && <RegistWindow onClose={closeRegist}/>}
     {isSignInOpen && <SignInWindow onClose={closeSignIn}/>}
     {isLogoutOpen && <LogoutWindow onClose={closeLogout} onButton={handleLogout}/>}
    </div>
  )

}

export default Navbar;