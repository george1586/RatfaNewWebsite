import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <CartDrawer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
