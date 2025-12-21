import Button from '../Button/Button'
import styles from './RegistWindow.module.scss'
import cross from '../../assets/cross.svg'

import {useState, useEffect, useRef} from 'react';

import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next';

const USER_REGEX = /^[A-Za-z][a-zA-Z0-9-_]{5,16}$/;
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{7,24}$/;

const CHECK_USERNAME_URL = '/api/v1/validation/check-username';
const CHECK_MAIL_URL = '/api/v1/validation/check-email';
const REGISTER_URL = '/api/v1/auth/register';

const RegistWindow = ({onClose}) => {
  const {t} = useTranslation();
  const userRef = useRef();
  const mailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false);

  const [userAvailable, setUserAvailable] = useState(false);

  const [mail, setMail] = useState('')
  const [validMail, setValidMail] = useState(false);

  const [mailAvailable, setMailAvailable] = useState(false);

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const registerUser = async (data) => {
    try{
      const response = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      });
      if(!response.ok){
        let errorData = await response.json().catch(() => ({ message: 'Ошибка сервера' }));
        setErrMsg(errorData.message || `HTTP Error! Status: ${response.status}`);
      }
      return true;
    }
    catch (e) {
      console.error("Registration failed:", e);
      setErrMsg(e.message || 'Не удалось зарегистрироваться. Попробуйте снова.');
      errRef.current.focus(); 
    }
  }

  const checkUsername = async(user) => {
    if(!user){
      return;
    }
      try{
        const response = await fetch(`${CHECK_USERNAME_URL}?username=${user}`);

        if(!response.ok){
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const isAvailable = jsonResponse.data;

        if(isAvailable){
          setUserAvailable(true);
        }
        else{
          setUserAvailable(false);
          setErrMsg('');
        }
      }
      catch(e){
        console.error("Failed to check username", e);
        setErrMsg('Ошибка проверки логина. Попробуйте позже.');
        setUserAvailable(false);
      }
  }
  const checkMail = async(mail) => {
    if(!mail){
      return;
    }
      try{
        const response = await fetch(`${CHECK_MAIL_URL}?email=${mail}`);

        if(!response.ok){
          throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        const isAvailable = jsonResponse.data;

        if(isAvailable){
          setMailAvailable(true);
        }
        else{
          setMailAvailable(false);
          setErrMsg('');
        }
      }
      catch(e){
        console.error("Failed to check email", e);
        setErrMsg('Ошибка проверки почты. Попробуйте позже.');
        setMailAvailable(false);
      }
    }

  useEffect( () => {
    userRef.current.focus();
  }, [])

  useEffect( () => {
    const isValid = USER_REGEX.test(user);
    setValidName(isValid);
    console.log(isValid);
    console.log(user);
    console.log(userAvailable);
    if (user === '') {
        setUserAvailable(true); 
        return; 
    }
    if(isValid && user){
      const delayCheck = setTimeout(() => {
              checkUsername(user);
      },500)
      return () => clearTimeout(delayCheck);
    }
   
  }, [user])

  useEffect( () => {
    const isValid = MAIL_REGEX.test(mail);
    console.log(isValid);
    setValidMail(isValid);
    console.log(mail);
    console.log(mailAvailable)
    if(mail === ''){
      setMailAvailable(true);
      return;
    }
    if (isValid && mail){
      const delayCheck = setTimeout(() => {
        checkMail(mail);
      }, 500)
      return () => clearTimeout(delayCheck);
    }
  }, [mail])

  useEffect( () => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect( () => {
    setErrMsg('');
  }, [user, mail, pwd, matchPwd])

  const handleSubmit = async(e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = MAIL_REGEX.test(mail);
    const v3 = PWD_REGEX.test(pwd);
    if(!v1 || !v2 || !v3){
      setErrMsg('Некорректный ввод');
      return;
    }
    const registData = {
      username: user,
      password : pwd,
      confirmPassword: matchPwd,
      email: mail,
    };

    const result = await registerUser(registData);

     if (result === true) {
        setSuccess(true);
     }
  }

  return ReactDOM.createPortal(
    

    <section>
     <div className={styles["window"]}>
       <div className={styles["frame"]}>
        <div className={styles["block"]}>
          <p className={styles["title"]}>{!success ? t("registration") : t("success")}</p>
          <img src={cross} className={styles["cross"]} onClick={onClose}/>
          {success ? 
      ( <div className={styles["successBlock"]}>
        <p>🎉</p>
                <h3>{t("completed")}</h3>
                <p>{t("completed_under")}<br/>
                {t("mail_msg")}
              </p>
           </div>    
      ) : (
        <form onSubmit={handleSubmit} className={styles["formBlock"]}>
    <p ref={errRef} className= {errMsg ? "errMsg" : 
      "offscreen"} aria-live="assertive">{errMsg}</p>
      
          <div className={styles["fields"]}>
            <div className={styles["columnNames"]}>
              <label htmlFor='username'>{t("login")} </label>
              <label htmlFor='mail'>{t("mail")}</label>
              <label htmlFor='password'>{t("password")}</label>
              <label htmlFor='confirm_pwd'>
                {t("repeat")}<br/> 
                {t("password")}
              </label>
            </div>
              <div className={styles["inputFields"]}>
                <div className={styles["loginBlock"]}>
                  <input 
                  type= "text"
                  id = 'username'
                  ref={userRef}
                  autoComplete = 'off'
                  onChange= {(e) => setUser(e.target.value)}
                  required
                  aria-invalid = {!validName || (validName && !userAvailable) ? "true" : "false"}
                  aria-describedby = {
                    !validName ?
                    'nonValidName'
                    :
                    validName && !userAvailable ?
                    'existingName'
                    :
                    undefined
                }
                  className={styles["loginInput"]}
                  />
                  <p id= 'nonValidName' className={user && !validName ? styles['instructions'] : styles['offscreen']}>
                    {t("login_val1")}<br/>
                    {t("login_val2")}
                  </p>
                   <p id= 'existingName' className={!userAvailable && user && validName  ? styles['instructions'] : styles['offscreen']}>
                    {t("login_val_exist")}
                  </p>
                </div>
              <div className={styles["mailBlock"]}>
                <input 
                 type= "text"
                 id = 'mail'
                 ref={mailRef}
                 autoComplete = 'off'
                 onChange= {(e) => setMail(e.target.value)}
                 required
                 aria-invalid = {!validMail || (validMail && !mailAvailable) ? "true" : "false"}
                 aria-describedby = {
                  !validName ? 'nonValueMail' 
                  : 
                  !mailAvailable ? 'existingMail'
                  :
                  undefined
                 }
                 className={styles["mailInput"]}
                 />
                <p id= 'nonValueMail' className={mail && !validMail ? styles['instructions'] : styles['offscreen']}>
                  {t("mail_val1")}<br/>
                  {t("mail_val2")}
                </p>
                <p id= 'existingMail' className={ mail && validMail && !mailAvailable ? styles['instructions'] : styles['offscreen']}>
                  {t("mail_val_exist")}
                </p>
                
              </div>
              <div className={styles["passwordBlock"]}>
                <input
                  type= 'password'
                  id= 'password'
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid = {validPwd ? "false" : "true"}
                  aria-describedby = 'pwdnote'
                  className={styles["passwordInput"]}
                 />
                <p id= 'pwdnote' className={pwd && !validPwd ? styles['instructions'] : styles['offscreen']}>
                  {t("pwd_val1")}<br/>
                  {t("pwd_val2")}
                </p>
              </div>
              <div className={styles["repeatPasswordBlock"]}>
                <input 
                  type= 'password'
                  id= 'confirm_pwd'
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid = {validMatch ? "false" : "true"}
                  aria-describedby = 'confirmnote'
                  className={styles["repeatPasswordInput"]}
                />
                <p id= 'confirmnote' className={ matchPwd && !validMatch ? styles['instructions'] : styles['offscreen']}>
                  {t("pwd_val_repeat")}
                </p>
              </div>
              
            </div>
            
          </div>
          <Button 
          type = "submit"
          disabled={!validName || !userAvailable || !validMail || !mailAvailable || !validPwd || !validMatch || success ? true : false} 
          buttonName={t("continue")} />
          </form>
      )}
       </div>
      </div>
      </div>
       </section>,
       document.body
  );
}

export default RegistWindow