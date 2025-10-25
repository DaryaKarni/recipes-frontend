import styles from './Profile.module.scss'
import defaultPhoto from '../../assets/profile-photo-default.svg'
import editIcon from '../../assets/edit-icon.svg'
import BlocksRecipe from '../../components/BlocksRecipe/BlocksRecipe';

import dumplings from '../../assets/fake-recipes-images/dumplings.svg';
import fish from '../../assets/fake-recipes-images/fish.svg';
import khachapuri from '../../assets/fake-recipes-images/khachapuri.svg';

const UserInfo = {
  roles: [
    "USER"
  ],
  sub: "kinkate",
}
const NewRecipesData = [
  { id: 1, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 2, authorUsername: 'modory', name: 'запечённая рыба', image: fish, meal: 'ужин', time: '90 минут', rating: 3 },
  { id: 3, authorUsername: 'modory', name: 'хачапури по-аджарски и что то там ещё вкусное', image: khachapuri, meal: 'ужин', time: '45 минут', rating: 4 },
  { id: 4, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 5, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  { id: 6, authorUsername: 'kinkate', name: 'пельмешки', image: dumplings, meal: 'обед', time: '10 минут', rating: 5},
  
  
];

const Profile = () => {
  const username = UserInfo.sub;
  const data = NewRecipesData //.filter(recipe => recipe.authorUsername === UserInfo.sub);
  return (
    <div className={styles.profile}>
      <div className={styles["headerBlock"]}>
        <p className={styles["header"]}>
          Мой профиль
        </p>
      </div>
        <div className={styles["profileBlock"]}>
          <div className={styles["username"]}>
            {username}
          </div>
        
          <div className={styles["imageFrame"]}>
            <img src={defaultPhoto} className={styles["photo"]}/>
          </div>
          <img src={editIcon} className={styles["editIcon"]}></img>
        </div>


          <p className={styles["title"]}>Мои рецепты</p>
          <div className={styles["recipesBlock"]}>
            <BlocksRecipe data={data} isFavoriteSection={false}/>
          </div>

    </div>
      
  )
}

export default Profile