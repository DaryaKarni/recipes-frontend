import {createContext, useContext, useState, useEffect} from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const AuthContext = createContext({});
const AVATAR_URL = '/api/v1/users/avatar';

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    if(token){
      try{
        const decoded = jwtDecode(token);
        return{
          token,
          user: decoded.sub,
          role: decoded.roles[0],
          avatar: null,
        }
      }
      catch(e){
        console.error("Invalid token");
        localStorage.removeItem('token');
        return {user: null, role: null, token: null, avatar: null}
      }
    }
    return {user: null, role: null, token: null? avatar: null};
  });

  useEffect (() => {
    if (!auth.token) {
        return; 
    }
    const fetchAvatar = async() =>{
      try{
        const response = await axios.get(AVATAR_URL, {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
          }
        });
        const avatar = response.data.data;
        if(avatar && avatar !== auth.avatar){
          setAuth(prev => ({
            ...prev,
            avatar: avatar,
          }));
        }
      }
      catch(e){
        if (axios.isAxiosError(e) && e.response?.status === 401) {
            console.warn("Avatar fetch failed: Token expired. Forcing logout.");
            // вызвать здесь полный logout, если токен истек
        }
        console.error('Failed to fetch avatar', e);
      }
    };
    if(auth.token){
    fetchAvatar();
    }
    
  },[auth.token])

  return (
    <AuthContext.Provider value ={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContext;