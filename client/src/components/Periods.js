import React from "react";

export default function Periods({ onChangePeriod, periods, defaultPeriod }) {
  const handleChangePeriod = (event) => {
    onChangePeriod(event.target.value);
  };

  const getDataFormated = (item) => {
    let month = +item.split("-")[1] - 1;

    const monthName = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    return `${monthName[month]} / ${item.split("-")[0]}`;
  };

  return (
    <div className="col">
      <select
        className="browser-default"
        value={defaultPeriod}
        onChange={handleChangePeriod}
      >
        {periods.length > 0 &&
          periods.map((item) => {
            return (
              <option key={item} value={item}>
                {getDataFormated(item)}
              </option>
            );
          })}
      </select>
    </div>
  );
}
