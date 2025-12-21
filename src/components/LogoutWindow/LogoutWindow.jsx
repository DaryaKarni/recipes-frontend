import React from 'react'
import Button from '../Button/Button'
import styles from './LogoutWindow.module.scss'
import cross from '../../assets/cross.svg'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'

const LogoutWindow = ({onClose, onButton}) => {
  const {t} = useTranslation();
  return ReactDOM.createPortal(
    <div className={styles["window"]}>
      <div className={styles["frame"]}>
         <div className={styles["block"]}>
          <p className={styles["title"]}>{t("sure_to_logout")}</p>
          <img src={cross} className={styles["cross"]} onClick={onClose}/>
          <div className={styles["buttons"]}>
          <Button
          type='button'
          buttonName={t("yes")}
          onClick={()=> {
            onButton();
            onClose();
          }}
          />
          <Button
          type='button'
          buttonName={t("no")}
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