import RecipeCard from '../RecipeCard/RecipeCard'
import styles from './BlocksRecipe.module.scss'


const BlocksRecipe = ({data}) => {
  return (
    <div className={styles["frame-block-cards"]}>
      <div className={styles["block-cards"]}>
      {data.map((recipe) => (
        <RecipeCard
          key = {recipe.id}
          recipe= {recipe}
          isSmall={true}
        />
      ))}
      </div>
    </div>
  )
}

export default BlocksRecipe