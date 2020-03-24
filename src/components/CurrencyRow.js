import React from "react";

const CurrencyRow = ({ currencyLocations, selectedLocation }) => {
  console.log(currencyLocations);
  return (
    <div>
      <input type="number" />
      <select value={selectedLocation}>
        {currencyLocations.map(location => {
          return (
            <option value={location} key={location}>
              {location}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyRow;
