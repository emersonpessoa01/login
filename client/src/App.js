import React from "react";
import axios from "axios";


const api = axios.create({
  baseURL: "api",
  headers: {
    'Content-type': 'application/json',
  },
});

export default function App() {
  const [transactions, setTransactions] = React.useState([]);
  // const [filteredTransactions, setFilteredTransactions] = React.useState([]);

  React.useEffect(() => { 
    const fetchTransactions = async () => {
      // const axiosObject = await api.get("/transaction?period=2019-07");//axiosObject - demonstra toda estrutura do objeto
       const { data } = await api.get("/transaction?period=2019-07"); //pegando somente o que interessa do vetor de objeto
      // console.log(axiosObject);
      console.log(data);

      setTransactions(data.transactions)
      // setfilteredTransactions(data.transactions)
    };
    fetchTransactions();
  }, []);

  return (
    <div className="container">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>

      {
        transactions.map(({_id,description})=>{
        return<p key={_id}>{description}</p>
        })
      } 
    </div>
  );
}
