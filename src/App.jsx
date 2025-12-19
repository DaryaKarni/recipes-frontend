import Navbar from './components/Navbar/Navbar'
import Catalog from './components/Catalog/Catalog'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Favorite from './pages/Favorite/Favorite'
import RecipePage from './pages/RecipePage/RecipePage'
import Profile from './pages/Profile/Profile'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Popular from './pages/Popular/Popular'
import Search from './pages/Search/Search'

const App = () => {
  return (
    <Router>
      <div >
        <Navbar/>
        <Catalog/>
        <div className="content">
          <Routes>

            <Route path="/" element={<Home/>} /> 
            <Route path="/favorite" element={<Favorite/>} /> 
            <Route path="/recipe/:id" element={<RecipePage/>} /> 
            <Route path="/profile" element={<Profile/>} /> 
            <Route path="/popular" element={<Popular/>}/>
            <Route path="/search" element={<Search/>}/>
         
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App