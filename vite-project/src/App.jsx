import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="header">
        <img className="logo" src="/src/assets/logo.png" alt="" />
        <h1 className="learned">
          <b>FACT FUSION</b>
        </h1>
        <button className="share-btn">SHARE A FACT</button>
      </div>
    </>
  );
}

export default App;
