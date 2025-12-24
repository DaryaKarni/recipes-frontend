import { useTranslation } from 'react-i18next';
import styles from './Comment.module.scss'
import {useRef, useEffect, useState, useContext} from 'react'

const Comment = ({authorUsername, initialText, isPersonal}) => {
  const {t} = useTranslation();
  const [commentText, setCommentText] = useState('');
  const textareaRef = useRef(null);


  const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };
  
  useEffect(() => {
        if (isPersonal) {
            adjustHeight();
        }
    }, [commentText, isPersonal]);  

  const addressUser = () => {
    return isPersonal ? t("you"): t("user");
  };

  const handleChange = (e) => {
    setCommentText(e.target.value);    
  };
  const author = `${addressUser({isPersonal})} ${authorUsername}`

  return (
    <div className={styles.comment}>
      <div className={styles["author"]}>
        {author}
      </div>
      <div className={styles["textBlock"]}> 
        {isPersonal ? (
          <textarea 
        ref= {textareaRef}
        className={styles["text"]} 
        placeholder={t("add_comment")}
        value={commentText}
        onChange={handleChange}
        rows = {1}/>
        ) : (
          <p className = {styles["textDisplay"]}>
            {initialText}
          </p>
        )
      }
        
      </div>
    </div>
  )
}

export default Comment