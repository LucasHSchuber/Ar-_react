import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components include
import Index from "./components/mainComponents/index";
import Header from "./components/headerComponents/header";
import Footer from "./components/footerComponents/footer";
import Home from "./components/mainComponents/home";
import Additem from "./components/mainComponents/additem";
import Information from "./components/mainComponents/information";
import Settings from "./components/mainComponents/settings";



//import css
import '../src/assets/css/global.css';
import './App.css';

function App() {
  return (
    <div className="gradient-container">
      <Router>
        <div className="App">
          <Header />
          <div className="container">

            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/stock" element={<Index />} />
              <Route path="/additem" element={<Additem />} />
              <Route path="/information" element={<Information />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>

          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
