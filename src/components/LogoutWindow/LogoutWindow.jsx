import React from 'react'
import Button from '../Button/Button'
import styles from './LogoutWindow.module.scss'
import cross from '../../assets/cross.svg'
import ReactDOM from 'react-dom'
const LogoutWindow = ({onClose, onButton}) => {
  return ReactDOM.createPortal(
    <div className={styles["window"]}>
      <div className={styles["frame"]}>
         <div className={styles["block"]}>
          <p className={styles["title"]}>Вы точно хотите выйти?</p>
          <img src={cross} className={styles["cross"]} onClick={onClose}/>
          <div className={styles["buttons"]}>
          <Button
          type='button'
          buttonName='Да'
          onClick={()=> {
            onButton();
            onClose();
          }}
          />
          <Button
          type='button'
          buttonName='Нет'
          onClick={onClose}
          />
          </div>
         </div>
      </div>
    </div>,
    document.body
  )
}

export default LogoutWindow