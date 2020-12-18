import React from 'react';
import axios from "axios";

const api = axios.create({
  baseURL: "api",
  headers: {
    "Content-type": "application/json",
  },
});

export default function FormSeach({
  yearMonth,
  actionYearMonth,
  onPersist,
  clearGrades,
}) {
  const handleInputChange = async (event) => {
    actionYearMonth(event.target.value);
    clearGrades([]);
    const { data } = await api.get(`/transaction?period=${yearMonth}`); //pegando somente o que interessa do vetor de objeto

    const res = await fetch(data);
    let dados = await res.json();
    onPersist(dados);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <form>
        <input
          className="input-field "
          onChange={handleInputChange}
          type="month"
          key="MesAno"
          value={yearMonth}
        />
      </form>
    </div>
  );
}
