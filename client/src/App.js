import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "api",
  headers: {
    "Content-type": "application/json",
  },
});

const PERIODS = [
  "2019-01",
  "2019-02",
  "2019-03",
  "2019-04",
  "2019-06",
  "2019-06",
  "2019-07",
  "2019-08",
  "2019-09",
  "2019-10",
  "2019-11",
  "2019-12",
  "2020-01",
  "2020-02",
  "2020-03",
  "2020-04",
  "2020-05",
  "2020-06",
  "2020-07",
  "2020-08",
  "2020-09",
  "2020-10",
  "2020-11",
  "2020-12",
  "2021-01",
];

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [yearMonth, setYearMonth] = useState("2020-07");

  React.useEffect(() => {
    const fetchTransactions = async () => {
      // const axiosObject = await api.get("/transaction?period=2019-07");//axiosObject - demonstra toda estrutura do objeto
      const { data } = await api.get(`/transaction?period=${yearMonth}`); //pegando somente o que interessa do vetor de objeto
      // console.log(axiosObject);
      console.log(data);

      setAllGrades(data);
    };
    fetchTransactions();
  }, [yearMonth]);

  //lançamentos
  const handlePeriodChange=(event)=>{
    const newPeriod= event.target.value
    setYearMonth(newPeriod)
  }



  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>
      <select
        className="browser-default"
        value={yearMonth}
        onChange={handlePeriodChange}
      >
        {PERIODS.map((period) => {
          return <option>{period}</option>;
        })}
      </select>

      

      {allGrades.map(
        ({ _id, yearMonthDay, category, description, value }) => {
          return (
            <div>
              <span style={{ margin: 7 }}>
                {yearMonthDay}-<strong>{category}</strong>-{description}-
                {value}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}

