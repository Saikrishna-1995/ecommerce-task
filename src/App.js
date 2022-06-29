import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
      <Header />
      <Footer />
    </div>
  );
};
export default App;
