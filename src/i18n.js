import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "search": "Search",
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
      "general": "General",
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

      "create_recipe": "Create your first recipe",
      "get_fav": "Start adding your favorite recipes!",

      "loading_fav": "Loading your favorite recipes...",

      "loading_dayRecipe": "Loading recipe of the day...",
      "unavailable_dayRecipe": "Recipe of the day is unavailable",
      "loading_newRecipes": "Loading latest recipes...",
      "unavailable_newRecipes": "Latest recipes are unavailable",

      "popular_title": "Popular",
      "loading_popular": "Loading popular",

      "loading_recipe": "loading recipe...",
      "error_recipe": "Recipe is not found",

      "search_title": "Search results",
      "loading_search": "Loading search results...",
      "no_results": "No recipes found",
    }
  },
  ru: {
    translation: {
      "search": "Поиск",
      "button_registrate": "Регистрация",
      "button_login": "Вход",
      "button_lang": "Рус", 
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
      "general": "Общее",
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

      "create_recipe": "Создайте свой первый рецепт",
      "get_fav": "Начните добавлять любимые рецепты!",

      "loading_fav": "Загрузка ваших любимых рецептов...",
      
      "loading_dayRecipe": "Загрузка рецепта дня...",
      "unavailable_dayRecipe": "Рецепт дня не доступен.",
      "loading_newRecipes": "Загрузка новейших рецептов...",
      "unavailable_newRecipes": "Новейшие рецепты не доступны.",

      "popular_title": "Популярное",
      "loading_popular": "Загрузка популярного...",

      "loading_recipe": "Загрузка рецепта...",
      "error_recipe": "Рецепт не найден",

      "search_title": "Результаты поиска",
      "loading_search": "Загрузка результатов поиска...",
      "no_results": "Рецепты не найдены",
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
      order: ['cookie'], 
      caches: ['cookie'], 
      //Название cookie, которое соответствует вашему бэкенду
      lookupCookie: 'lang', // Имя куки (как вы хотели в задании key="lang")
      cookieMinutes: 10080,
    },

    interpolation: {
      escapeValue: false // не экранирует HTML
    }
  });

export default i18n;