  import Button from '../Button/Button'
  import styles from './SignInWindow.module.scss'
  import cross from '../../assets/cross.svg'
  import { useState, useRef, useEffect, useContext } from 'react'
  import AuthContext from '../../context/AuthProvider'
  import {jwtDecode} from 'jwt-decode'

  const LOGIN_URL = "/api/v1/auth/login"

  const SignInWindow = ({onClose}) => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [pwd, setPwd] = useState('');
    const [success, setSuccess] = useState(false);

    const signInUser = async(data) => {
       
      try{
        const response = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify(data)
        });

        if(!response.ok){
             if (response.status === 400) {
                 setErrMsg('Неверный формат данных');
             } else if (response.status === 401) {
                 setErrMsg('Неверный логин или пароль');
             } else {
                 setErrMsg(`HTTP Error! Status: ${response.status}`);
             }
             return;
        }
        console.log('continue');
        const responseData = await response.json();
        const token = responseData?.token;
        console.log(token);
        const decoded = jwtDecode(token);
        
        console.log(decoded);

        const usernameFromToken = decoded.sub;
        const roleFromToken = decoded.roles[0];
        console.log({usernameFromToken});
         setAuth({
          user: usernameFromToken,
          role: roleFromToken,
          token
        });

        localStorage.setItem('token', token);
        setUser('');
        setPwd('');
        return true;
        
      }
      catch (err) {
          setErrMsg('Нет ответа от сервера (Сетевая ошибка)');
          errRef.current.focus();
      }
    }
    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
      setErrMsg('');
    }, [user, pwd])
    const handleSubmit = async(e) => {
      e.preventDefault();
      const data = {username: user, password: pwd}//, language: lng
      const result = await signInUser(data);
      console.log(result);
      if (result === true) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    }
    return (
      
      <section>
        <p ref={errRef} className= {errMsg ? "errMsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
      <div className={styles["window"]}>
        <div className={styles["frame"]}>
          <div className={styles["block"]}>
            <p className={styles["title"]}>Вход</p>
            <img src={cross} className={styles["cross"]} onClick={onClose}/>
            <form onSubmit={handleSubmit} className={styles["formBlock"]}>
            <div className={styles["fields"]}>
              <div className={styles["columnNames"]}>
                <label htmlFor='username'>логин: </label>
                <label htmlFor='password'>пароль: </label>
              </div>
              <div className={styles["inputFields"]}>
                <div className={styles["loginBlock"]}>
                  <input 
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  className={styles["loginInput"]}/>
                </div>
                <div className={styles["passwordBlock"]}>
                  <input 
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  className={styles["passwordInput"]}/>
                </div>
              </div>
            </div>
            <Button 
            type = "submit"
            disabled={!user || !pwd || success}
            buttonName={'продолжить'}/>
            </form>
          </div>
        </div>
        
      </div>
      </section>

    )
  }

  export default SignInWindow