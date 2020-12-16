import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "api",
  headers: {
    "Content-type": "application/json",
  },
});
const RESOURCE = "/transaction";

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

const LIST_SCREEN = 0;
const MAINTENANCE_SCREEN = 1;

const EARNING_COLOR = "#0094ff";
const EXPENSE_COLOR = "#9897FF";

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  const [filteredTransactions, setFilteredTransactions] = React.useState([]);
  const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  const [currentScreen, setCurrentScreen] = React.useState(LIST_SCREEN);
  const [filteredText, setFilteredText] = React.useState("");

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

  React.useEffect(() => {
    let newFilteredTransactions = [...transactions];
    setFilteredTransactions(transactions);

    if (filteredText.trim() !== "") {
      newFilteredTransactions = newFilteredTransactions.filter(
        (transaction) => {
          return transaction.category.toLowerCase().includes(filteredText);
        }
      );
    }
    setFilteredTransactions(newFilteredTransactions);
  }, [transactions, filteredText]);

  const handleDeleteTransaction = async (event) => {
    const id = event.target.id;
    // console.log(id)

    await api.delete(`${RESOURCE}/${id}`);

    const newTransactions = transactions.filter((transaction) => {
      return transaction._id !== id;
    });

    setTransactions(newTransactions);
  };

  const handleFilterChange = (event) => {
    const text = event.target.value.trim();
    setFilteredText(text.toLowerCase());
  };

  const handlePeriodChange = (event) => {
    setCurrentPeriod(event.target.value);
  };

  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const numberFormatter = (number) => {
    return formatter.format(number);
  };

  const { transactionStyle, buttonStyle } = styles;

  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>
      {currentScreen === LIST_SCREEN ? (
        <>
          <select
            className="browser-default"
            value={currentPeriod}
            onChange={handlePeriodChange}
          >
            {PERIODS.map((period) => {
              return <option key={period}>{period}</option>;
            })}
          </select>

          <input
            type="text"
            autoFocus={true}
            placeholder="Escreva a categoria..."
            value={filteredText}
            onChange={handleFilterChange}
          />

          {filteredTransactions.map(
            ({ _id, yearMonthDay, category, description, value, type }) => {
              const currentColor = type === "+" ? EARNING_COLOR : EXPENSE_COLOR;

              return (
                <div
                  key={_id}
                  style={{ ...transactionStyle, backgroundColor: currentColor }}
                >
                  <span style={buttonStyle}>
                    <button className="waves-effect waves-light btn">
                      Editar
                    </button>
                    <button
                      className="waves-effect waves-light btn red darken-4"
                      onClick={handleDeleteTransaction}
                      id={_id}
                    >
                      X
                    </button>
                  </span>
                  <span>
                    {yearMonthDay}-<strong>{category}</strong>-{description}-
                    {numberFormatter(value)}
                  </span>
                </div>
              );
            }
          )}
        </>
      ) : (
        <p>TELA DE MANUTENÇÃO</p>
      )}
    </div>
  );
}

const styles = {
  transactionStyle: {
    padding: "5px",
    margin: "5px",
    border: "1px solid lightgray",
    borderRadius: "5px",
  },
  buttonStyle: {
    margin: "10px",
  },
};
