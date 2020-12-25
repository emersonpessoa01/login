import React, { useEffect, useState } from "react";
import { getAllPeriods } from "../api/apiService";
import Periods from "./Periods";

export default function Navigate({ defaultPeriod, onChangeYearMonth }) {
  const [periods, setPeriods] = useState([]);
  const [periodSelected, setPeriodSelected] = useState(defaultPeriod); //é uma props
  const [firstButtonDisable, setFirstButtonDisable] = useState(false);
  const [lastButtonDisable, setLastButtonDisable] = useState(false);

  useEffect(() => {
    const fetchPeriods = async () => {
      const json = await getAllPeriods();
      setPeriods(json);
    };

    if (periods !== []) fetchPeriods();
  }, [periods]);

  const handlePeriodChange = (selected) => {
    const index = periods.indexOf(selected);

    setPeriodSelected(selected);

    setFirstButtonDisable(index === 0);

    setLastButtonDisable(index >= periods.length - 1);

    onChangeYearMonth(selected); //é uma props
  };

  const handleFirstClick = () => {
    const index = periods.indexOf(periodSelected);

    select(index - 1);//volta um index
  };

  const handleLastClick = () => {
    const index = periods.indexOf(periodSelected);

    select(index + 1);//avança um index
  };

  const select = (index) => {
    const period = periods[index];
    handlePeriodChange(period);
  };

  const {centered} = styles
  return (
    <div className="container">
      <div className="row" style={centered}>
        Controle Financeiro
      </div>
      <div style={centered}>
        <div className="col">
          <button
            className="btn waves-effect waves-light"
            onClick={handleFirstClick}
            disabled={firstButtonDisable}
          >
            <i className="material-icons">keyboard_arrow_left</i>
          </button>
        </div>
        <Periods
          periods={periods}
          defaultPeriod={periodSelected}
          onChangePeriod={handlePeriodChange}
        ></Periods>
        <div className="col">
          <button
            className="btn waves-effect waves-light"
            onClick={handleLastClick}
            disabled={lastButtonDisable}
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  centered: {
    textAlign: "center",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontWeight:'bold'
  },
};
