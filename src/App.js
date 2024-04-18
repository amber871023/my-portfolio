import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: "calc(100vh - 210px)" }}>
        {/* Adjust 210px according to  header and footer height */}
        <Routes>
          {/* Use Routes component for defining routes */}
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
      <Footer />
    </Router >
  );
}

export default App;
