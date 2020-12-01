import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api-transaction-chanceller.herokuapp.com/",
});

export default function App() {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      const axiosObject = await api.get("/transaction");

      console.log(axiosObject);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="containe">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>
    </div>
  );
}
