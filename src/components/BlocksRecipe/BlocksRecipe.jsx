import RecipeCard from '../RecipeCard/RecipeCard'
import styles from './BlocksRecipe.module.scss'


const BlocksRecipe = ({data, isFavoriteSection}) => {
  return (
    <div className={styles["frame-block-cards"]}>
      <div className={styles["block-cards"]}>
      {data.map((recipe) => (
        <RecipeCard
          key = {recipe.id}
          recipe= {recipe}
          isSmall={true}
          isFavorite={isFavoriteSection}
        />
      ))}
      </div>
    </div>
  )
}

export default BlocksRecipe