import Navbar from './components/Navbar/Navbar'
import Catalog from './components/Catalog/Catalog'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Favorite from './pages/Favorite/Favorite'
import RecipePage from './pages/RecipePage/RecipePage'
import Profile from './pages/Profile/Profile'
const App = () => {
  return (
      <div >
        <Navbar/>
        <Catalog/>
        <div className="content">
          {/* <Home/> */}
          <Favorite/>
          {/* <RecipePage/> */}
          <Profile/>
        </div>
        <Footer/>
      </div>
  );
}

export default App