import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
// import { Analytics } from '@vercel/analytics/react';


function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} ></Route>
      </Routes>
      {/* <Analytics /> */}
    </Router>
  );
}

export default App