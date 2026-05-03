import { useEffect } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import PreOrderSuccess from "./pages/PreOrderSuccess";
import { track } from "./lib/analytics";

function PageTracker() {
    const location = useLocation();
    useEffect(() => {
        track('$pageview', { $current_url: window.location.href });
    }, [location.pathname]);
    return null;
}

function App() {
    return (
        <Router>
            <PageTracker />
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
