import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home'
import Navbar from './components/NavBar';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import Success from './pages/Success';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto p-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />


            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
