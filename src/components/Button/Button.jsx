import styles from './Button.module.scss'

const Button = ({buttonName, onClick, type="button", disabled=false}) => {
  return (
    <button 
    className={styles.button} 
    onClick={onClick} 
    type={type}
    disabled = {disabled}>
      {buttonName}
    </button>
  )
}

export default Button