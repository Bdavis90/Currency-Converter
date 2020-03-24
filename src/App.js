import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow";
import axios from "axios";

function App() {
  const [currencyLocations, setCurrencyLocations] = useState([]);
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromLocation, setAmountInFromLocation] = useState(true);

  let toAmount;
  let fromAmount;

  if (amountInFromLocation) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  console.log(currencyLocations);
  console.log(exchangeRate);
  useEffect(() => {
    axios.get("https://api.exchangeratesapi.io/latest").then(data => {
      console.log(data);
      const firstCurrency = Object.keys(data.data.rates)[0];
      setCurrencyLocations([data.data.base, ...Object.keys(data.data.rates)]);
      setFromLocation(data.data.base);
      setToLocation(firstCurrency);
      setExchangeRate(data.data.rates[firstCurrency]);
    });
  }, []);

  useEffect(() => {
    if (fromLocation != null && toLocation != null) {
      axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${fromLocation}&symbols=${toLocation}`
        )
        .then(data => {
          console.log(data.data.rates[toLocation]);
          setExchangeRate(data.data.rates[toLocation]);
        });
    }
  }, [fromLocation, toLocation]);

  const fromAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromLocation(true);
  };

  const toAmountChange = e => {
    setAmount(e.target.value);
    setAmountInFromLocation(false);
  };

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow
        currencyLocations={currencyLocations}
        selectedLocation={fromLocation}
        onChangeLocation={e => setFromLocation(e.target.value)}
        onChangeExchange={fromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyLocations={currencyLocations}
        selectedLocation={toLocation}
        onChangeLocation={e => setToLocation(e.target.value)}
        onChangeExchange={toAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
