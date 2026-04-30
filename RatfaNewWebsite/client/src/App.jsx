import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
// import { Analytics } from '@vercel/analytics/react';


function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} ></Route>
        <Route path="/products" element={<ProductPage></ProductPage>}></Route>
      </Routes>
      {/* <Analytics /> */}
    </Router>
  );
}

export default App