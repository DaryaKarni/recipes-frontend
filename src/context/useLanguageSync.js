import { useTranslation } from 'react-i18next';
import { useContext } from 'react'; // Если вам нужен AuthContext
import AuthContext from '../context/AuthProvider'; 

const LANG_URL = '/api/v1/users/language';
export const useLanguageSync = () => {
    const { i18n } = useTranslation();
     const { auth } = useContext(AuthContext); // Если нужна авторизация

    const currentLang = i18n.language;
    
    const syncLanguageWithBackend = async () => {

        const nextLang = currentLang === 'ru' ? 'en' : 'ru';

        i18n.changeLanguage(nextLang); 
        if(auth?.token){
            try {
                await fetch(LANG_URL, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}` 
                    },
                    body: JSON.stringify({ language: nextLang })
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                
            } catch (error) {
                console.error("Ошибка при синхронизации языка с бэкендом:", error);
            }
        }
    };
    
    return {
        currentLang,
        syncLanguageWithBackend,
    };
};