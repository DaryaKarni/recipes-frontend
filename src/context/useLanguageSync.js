import { useTranslation } from 'react-i18next';
// import { useContext } from 'react'; // Если вам нужен AuthContext
// import AuthContext from '../context/AuthProvider'; 

export const useLanguageSync = () => {
    const { i18n } = useTranslation();
    // const { auth } = useContext(AuthContext); // Если нужна авторизация

    const currentLang = i18n.language;
    const nextLang = currentLang === 'ru' ? 'en' : 'ru';

    const syncLanguageWithBackend = async (lng) => {

        i18n.changeLanguage(lng); 

        // try {
        //     await fetch('/api/v1/user/set-language', { 
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             // 'Authorization': `Bearer ${auth.token}` 
        //         },
        //         body: JSON.stringify({ lang: lng })
        //     });
        // } catch (error) {
        //     console.error("Ошибка при синхронизации языка с бэкендом:", error);
        // }
    };
    
    return {
        currentLang,
        nextLang,
        syncLanguageWithBackend,
    };
};