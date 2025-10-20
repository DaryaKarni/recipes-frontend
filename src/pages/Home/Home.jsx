import styles from './Home.module.scss'
import background from '../../assets/background-recipe-of-the-day.svg'
import imageRecipe from '../../assets/ratatouille.svg'
import RecipeCard from '../../components/RecipeCard/RecipeCard'

import dumplings from '../../assets/fake-recipes-images/dumplings.svg';
import fish from '../../assets/fake-recipes-images/fish.svg';
import khachapuri from '../../assets/fake-recipes-images/khachapuri.svg';

const NewRecipesData = [
  { id: 1, name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 2, name: 'запечённая рыба', image: fish, meal: 'ужин', time: '90 минут', rating: 3 },
  { id: 3, name: 'хачапури по-аджарски и что то там ещё вкусное', image: khachapuri, meal: 'ужин', time: '45 минут', rating: 4 },
];

const DayRecipeData = [
  { id: 1, name: 'Рататуй', image: imageRecipe, description: 'Овощи, запечённые в духовке', meal: 'обед', time: '10 минут', rating: 5},
];

const Home = () => {
  const dayRecipe = DayRecipeData[0];
  return (
    <div className={styles.home}>
      <div className={styles["day-recipe"]}>
        <div className={styles["recipe"]}>
          <img src={dayRecipe.image} alt="" className={styles["imageRecipe"]}/>
          <div className={styles['info']}>
            <p className={styles['name']}>
              {dayRecipe.name}
            </p>
            <p className={styles['description']}>
              {dayRecipe.description}
            </p>
            <button>
              to recipe
            </button>
          </div>
          
        </div>
        <div className={styles["background"]}>
          <img src={background} alt=""></img>
          <p className={styles["title"]}>Recipe of the day</p>
        </div>
      </div>

      <div className={styles["new-recipes-title"]}>
        <p> New recipes </p>
      </div> 

      <div className={styles["new-recipes"]}>
        <div className={styles["new-recipes-cards"]}>
          {NewRecipesData.map((recipe) => (
            <RecipeCard
              key = {recipe.id}
              recipe= {recipe}
              isSmall={false}
              //isFavoriteSection={false}
              />
          ))}
          </div>
        </div>  
        
    </div>
  )
}

export default Home