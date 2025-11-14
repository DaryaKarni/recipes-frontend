import Button from '../Button/Button'
import styles from './RegistWindow.module.scss'
import cross from '../../assets/cross.svg'

import {useState, useEffect, useRef} from 'react';

const USER_REGEX = /^[A-Za-z][a-zA-Z0-9-_]{6,16}$/;
const MAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,24}$/;

const CHECK_USERNAME_URL = '/api/v1/validation/check-username';
const CHECK_MAIL_URL = '/api/v1/validation/check-email';

const RegistWindow = ({onClose}) => {
  const userRef = useRef();
  const mailRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [userAvailable, setUserAvailable] = useState(false);

  const [mail, setMail] = useState('')
  const [validMail, setValidMail] = useState(false);
  const [mailFocus, setMailFocus] = useState(false);

  const [mailAvailable, setMailAvailable] = useState(false);

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
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
        setUserAvailable(false); 
        return; 
    }
    if(isValid && user){
      const delayCheck = setTimeout(() => {
              checkUsername(user);
      })
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
      setMailAvailable(false);
      return;
    }
    if (isValid && mail){
      const delayCheck = setTimeout(() => {
        checkMail(mail);
      })
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
    console.log(user, mail, pwd);
    setSuccess(true);
  }

  return (
    
    
    <section>
     <div className={styles["window"]}>
       <div className={styles["frame"]}>
        <div className={styles["block"]}>
          <p className={styles["title"]}>{!success ? 'Регистрация' : 'Успех'}</p>
          <img src={cross} className={styles["cross"]} onClick={onClose}/>
          {success ? 
      ( <div className={styles["successBlock"]}>
        <p>🎉</p>
                <h3>Регистрация завершена!</h3>
                <p>Вы успешно зарегистрированы в системе.</p>
           </div>    
      ) : (
        <form onSubmit={handleSubmit} className={styles["formBlock"]}>
    <p ref={errRef} className= {errMsg ? "errmsg" : 
      "offscreen"} aria-live="assertive">{errMsg}</p>
  
      
          <div className={styles["fields"]}>
            <div className={styles["columnNames"]}>
              <label htmlFor='username'>логин: </label>
              <label htmlFor='mail'>почта: </label>
              <label htmlFor='password'>пароль: </label>
              <label htmlFor='confirm_pwd'>
                повторите<br/> 
                пароль: 
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
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className={styles["loginInput"]}
                  />
                  <p id= 'nonValidName' className={userFocus && user && !validName ? styles['instructions'] : styles['offscreen']}>
                    от 6 до 16 символов.
                    Должно начинаться с буквы.<br/>
                    Латинские буквы, числа, _, - разрешены
                  </p>
                   <p id= 'existingName' className={userFocus && user && validName && !userAvailable ? styles['instructions'] : styles['offscreen']}>
                    Пользователь с таким логином уже существует в системе
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
                 onFocus={() => setMailFocus(true)}
                 onBlur={() => setMailFocus(false)}
                 className={styles["mailInput"]}
                 />
                <p id= 'nonValueMail' className={mailFocus && mail && !validMail ? styles['instructions'] : styles['offscreen']}>
                  Неверный формат электронной почты. <br/>
                  Адрес должен содержать символ @ и  домен.
                </p>
                <p id= 'existingMail' className={mailFocus && mail && validMail && !mailAvailable ? styles['instructions'] : styles['offscreen']}>
                  Пользователь с данной почтой уже зарегистрирован в системе.
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
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className={styles["passwordInput"]}
                 />
                <p id= 'pwdnote' className={pwdFocus && pwd && !validPwd ? styles['instructions'] : styles['offscreen']}>
                  от 8 до 24 символов <br/>
                  Должен включать числа и латинские буквы.
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
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className={styles["repeatPasswordInput"]}
                />
                <p id= 'confirmnote' className={matchFocus && matchPwd && !validMatch ? styles['instructions'] : styles['offscreen']}>
                  Пароли должны совпадать.
                </p>
              </div>
              
            </div>
            
          </div>
          <Button 
          type = "submit"
          disabled={!validName || !userAvailable || !validMail || !mailAvailable || !validPwd || !validMatch ? true : false} 
          buttonName={'продолжить'} />
          </form>
      )}
       </div>
      </div>
      </div>

    </section>
      
    
  )
}

export default RegistWindow