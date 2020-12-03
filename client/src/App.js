import React from "react";
import axios from "axios";


const api = axios.create({
  baseURL: "https://api-transaction-chanceller.herokuapp.com/",
  headers: {
    'Content-type': 'application/json',
  },
});

export default function App() {
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    const fetchTransactions = async () => {
      // const axiosObject = await api.get("/transaction");//demonstra toda estrutura do objeto
      const { data } = await api.get("/transaction"); //pegando somente o que interessa do vetor de objeto
      // console.log(axiosObject);
      console.log(data);

      setTransactions(data)
    };
    fetchTransactions();
  }, []);

  return (
    <div className="containe">
      <h1 className="center">Desafio Final do Bootcamp full Stack</h1>

      {
        transactions.map(({_id,description}) =>{
          return (
          <p className="center" key={_id}>{description}</p>
          )
        })
      }
    </div>
  );
}
