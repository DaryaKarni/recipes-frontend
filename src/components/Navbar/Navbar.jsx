import styles from'./Navbar.module.scss'
import search_icon from '../../assets/search-icon.svg'
import line_sign_in from '../../assets/line-sign-in.svg'
import { useState } from 'react';
import RegistWindow from '../RegistWindow/RegistWindow';
import SignInWindow from '../SignInWindow/SignInWindow';
//import {Link} from 'react-router-dom'

const Navbar = () => {
  const [isRegistOpen, setIsRegistOpen] = useState(false);
  const openRegist = () => setIsRegistOpen(true);
  const closeRegist = () => setIsRegistOpen(false);

  const [isSignInOpen, setIsSignIntOpen] = useState(false);
  const openSignIn = () => setIsSignIntOpen(true);
  const closeSignIn = () => setIsSignIntOpen(false);
  return (
    <div className={styles.navbar}>
      <div className={styles['home-bar']}>
        <a href="/" className={styles['recipies-home']}>recipies</a>
      </div>
      <div className={styles['search-box']}>
        <input type="text" placeholder='Search'/>
        <img src={search_icon} alt="" className={styles['search-icon']}/> 
      </div>

      <ul className={styles['sign-in']}>
        <li onClick={openRegist}>Registrate</li>
        {isRegistOpen && <RegistWindow onClose={closeRegist}/>}
        <img src={line_sign_in} alt="" className={styles['line-sign-in']}/>
        <li onClick={openSignIn}>Sign in</li>
        {isSignInOpen && <SignInWindow onClose={closeSignIn}/>}
      </ul>
        
    </div>
  )
}

export default Navbar;