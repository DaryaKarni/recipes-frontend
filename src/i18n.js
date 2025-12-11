import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "search_title": "Search",
      "button_registrate": "Registrate",
      "button_login": "Sign In",
      "button_lang": "Eng", //мб не надо
      "button_logout": "Sign Out",
      "popular_title": "Popular",
      "category_title": "Categories",
      "favorite_title": "Favorite",

      "dayRecipe_title": "Recipe of the day",
      "button_toRecipe": "to recipe",
      "newRecipes_title": "Latest recipes",

      "myFav_title": "My favorite",
      "myProfile_title": "My profile",
      "myRecipes_title": "My recipes",

      "author": "author",

      "description": "Description",
      "cooking_time": "Cooking time",
      "count_of_servings": "Count of servings",
      "ingredients": "Ingredients",
      "cooking": "Cooking",

      "comments": "Comments",
      "rate_recipe": "Rate recipe",

      "you": "You:",
      "user": "User:",
      "guest": "guest",
      "add_comment": "Add comment",
      "send_comment": "send",

    }
  },
  ru: {
    translation: {
      "search_title": "Поиск",
      "button_registrate": "Регистрация",
      "button_login": "Вход",
      "button_lang": "Рус", //мб не надо
      "button_logout": "Выход",
      "popular_title": "Популярное",
      "category_title": "Категории",
      "favorite_title": "Избранное",

      "dayRecipe_title": "Рецепт дня",
      "button_toRecipe": "к рецепту",
      "newRecipes_title": "Новейшие рецепты",

      "myFav_title": "Моё избранное",
      "myProfile_title": "Мой профиль",
      "myRecipes_title": "Мои рецепты",

      "author": "автор",

      "description": "Описание",
      "cooking_time": "Время приготовления",
      "count_of_servings": "Количество порций",
      "ingredients": "Ингредиенты",
      "cooking": "Приготовление",

      "comments": "Комментарии",
      "rate_recipe": "Оцените рецепт",

      "you": "Вы:",
      "user": "Пользователь:",
      "guest": "гость",
      "add_comment": "Добавить комментарий",
      "send_comment": "отправить",

    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru", 

    //Настройка детектора языка (для автоматического выбора)
    detection: {
      order: ['cookie', 'localStorage', 'navigator'], 
      caches: ['cookie', 'localStorage'], 
      //Название cookie, которое соответствует вашему бэкенду
      cookieOptions: { name: 'lang', sameSite: 'strict' }, 
      //Название ключа в LocalStorage
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false // не экранирует HTML
    }
  });

export default i18n;