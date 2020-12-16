import React from "react";
import axios from "axios";
import ListScreen from "./components/ListScreen";

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


  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>
      {currentScreen === LIST_SCREEN ? (
        <ListScreen 
        transactions={filteredTransactions}
        periods={PERIODS}
        currentPeriod={currentPeriod}
        filteredText={filteredText}
        onDeleteTransaction={handleDeleteTransaction}
        onFilterChange={handleFilterChange}
        onPeriodChange={handlePeriodChange}


        />
      ) : (
        <p>TELA DE MANUTENÇÃO</p>
      )}
    </div>
  );
}

