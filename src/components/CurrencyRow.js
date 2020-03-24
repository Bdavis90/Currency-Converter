import React from "react";

const CurrencyRow = ({
  currencyLocations,
  selectedLocation,
  onChangeLocation,
  onChangeExchange,
  amount
}) => {
  console.log(currencyLocations);
  return (
    <div>
      <input type="number" value={amount} onChange={onChangeExchange} />
      <select value={selectedLocation} onChange={onChangeLocation}>
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
