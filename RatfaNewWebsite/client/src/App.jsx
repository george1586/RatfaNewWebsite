import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import PreOrderSuccess from "./pages/PreOrderSuccess";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/preorder/success" element={<PreOrderSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
