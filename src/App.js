import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import axios from "axios";

function App() {
  const [currencyLocations, setCurrencyLocations] = useState([]);
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();

  console.log(currencyLocations);
  useEffect(() => {
    axios.get("https://api.exchangeratesapi.io/latest").then(data => {
      console.log(data);
      const firstCurrency = Object.keys(data.data.rates)[0];
      setCurrencyLocations([data.data.base, ...Object.keys(data.data.rates)]);
      setFromLocation(data.data.base);
      setToLocation(firstCurrency);
    });
  }, []);

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyLocations={currencyLocations}
        selectedLocation={fromLocation}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyLocations={currencyLocations}
        selectedLocation={toLocation}
      />
    </>
  );
}

export default App;
