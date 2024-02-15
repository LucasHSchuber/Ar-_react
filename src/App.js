import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


//components include
import Stock from './components/mainComponents/stock';
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
          <div className="">

            <div>
              <Routes>
                <Route path="/home" element={<Home />} />
              </Routes>
            </div>

            <div className='container'>
              <Routes>
                <Route path="/stock" element={<Stock />} />
              </Routes>
            </div>

            <div className='container'>
              <Routes>
                <Route path="/additem" element={<Additem />} />
              </Routes>
            </div>

            <div className='container'>
              <Routes>
                <Route path="/information" element={<Information />} />
              </Routes>
            </div>

            <div className='container'>
              <Routes>
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>


            {/* <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/additem" element={<Additem />} />
              <Route path="/information" element={<Information />} />
              <Route path="/settings" element={<Settings />} />
            </Routes> */}

          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
