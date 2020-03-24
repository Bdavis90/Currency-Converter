import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";

function App() {
  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow />
      <div className="equals">=</div>
      <CurrencyRow />
    </>
  );
}

export default App;
