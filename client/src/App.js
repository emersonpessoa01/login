import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "api",
  headers: {
    "Content-type": "application/json",
  },
});

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState("2019-01");

  React.useEffect(() => {
    const fetchTransactions = async () => {
      // const axiosObject = await api.get("/transaction?period=2019-07");//axiosObject - demonstra toda estrutura do objeto
      const { data } = await api.get(`/transaction?period=${currentPeriod}`); //pegando somente o que interessa do vetor de objeto
      // console.log(axiosObject);
      console.log(data);

      setTransactions(data.transactions);
    };
    fetchTransactions();
  }, [currentPeriod]);

  const handlePeriodChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>
      <div style={{ textAlign: 'center' }}>
      <form>
        <input
          className="input-field "
          onChange={handlePeriodChange}
          type="month"
          key="Yearmonth"
          value={currentPeriod}
        />
      </form>
    </div>


      {transactions.map(
        ({ _id, yearMonthDay, category, description, value }) => {
          return (
            <div key={_id}>
              <span style={{ margin: 7 }} key={_id}>
                {yearMonthDay}-<strong>{category}</strong>-{description}-{value}
              </span>
            </div>
          );
        }
      )}
    </div>
  );
}