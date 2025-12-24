import Navbar from './components/Navbar/Navbar'
import Catalog from './components/Catalog/Catalog'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Favorite from './pages/Favorite/Favorite'
import RecipePage from './pages/RecipePage/RecipePage'
import Profile from './pages/Profile/Profile'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Popular from './pages/Popular/Popular'
import Search from './pages/Search/Search'
import AuthContext from './context/AuthProvider'
import { useContext } from 'react'
import Chat from './pages/Chat/Chat'
import ChatButton from './components/ChatButton/ChatButton'

const ProtectedRoute = ({children}) => {
  const {auth} = useContext(AuthContext);
  const token = auth?.token;
  if (!token){
    return <Navigate to="/" replace/>;
  }
  return children;
};

const App = () => {
  const { auth } = useContext(AuthContext); // ✅ Достаём role для isAdmin
  const isAdmin = auth?.role === 'ADMIN'; 
  return (
    <Router>
      <div >
        <Navbar/>
        <Catalog/>
        <div className="content">
          <Routes>

            <Route path="/" element={<Home/>} /> 
            <Route path="/favorite" element={<ProtectedRoute><Favorite/></ProtectedRoute>}/> 
            <Route path="/recipe/:id" element={<RecipePage/>} /> 
            <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} /> 
            <Route path="/popular" element={<Popular/>}/>
            <Route path="/search" element={<Search/>}/>

             <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <Chat isAdmin={isAdmin} />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <ChatButton/>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App