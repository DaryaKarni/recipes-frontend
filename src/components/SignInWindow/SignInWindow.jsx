import Button from '../Button/Button'
import styles from './SignInWindow.module.scss'
import cross from '../../assets/cross.svg'
const SignInWindow = ({onClose}) => {
  return (
    <div className={styles["window"]}>
       <div className={styles["frame"]}>
        <div className={styles["block"]}>
          <p className={styles["title"]}>Регистрация</p>
          <img src={cross} className={styles["cross"]} onClick={onClose}/>
          <div className={styles["fields"]}>
            <div className={styles["columnNames"]}>
              <p>логин: </p>
              <p>пароль: </p>
            </div>
            <div className={styles["inputFields"]}>
              <div className={styles["loginBlock"]}>
                 <input className={styles["loginInput"]}/>
              </div>
              <div className={styles["passwordBlock"]}>
                <input className={styles["passwordInput"]}/>
              </div>
            </div>
          </div>
          <Button buttonName={'продолжить'}/>
        </div>
      </div>
      
    </div>
  )
}

export default SignInWindow