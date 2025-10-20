import styles from './Favorite.module.scss'
import RecipeCard from '../../components/RecipeCard/RecipeCard'

import dumplings from '../../assets/fake-recipes-images/dumplings.svg';
import fish from '../../assets/fake-recipes-images/fish.svg';
import khachapuri from '../../assets/fake-recipes-images/khachapuri.svg';
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';

const NewRecipesData = [
  { id: 1, name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 2, name: 'запечённая рыба', image: fish, meal: 'ужин', time: '90 минут', rating: 3 },
  { id: 3, name: 'хачапури по-аджарски и что то там ещё вкусное', image: khachapuri, meal: 'ужин', time: '45 минут', rating: 4 },
  { id: 4, name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 5, name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 6, name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  
];
const Favorite = () => {
  return (
    <div className={styles.favorite}>
      <div className={styles["fav-recipes-title"]}>
        <p> My favorite </p>
      </div> 

      <div className={styles["fav-recipes"]}>
        <BlocksRecipe data={NewRecipesData} isFavoriteSection={true}/>
      </div>  
    </div>
  )
}

export default Favorite