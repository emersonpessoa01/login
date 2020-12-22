import React, { useEffect, useState } from "react";
import * as api from "./api/apiService";
import Navigate from "./components/Navigate";
import Resumo from "./components/Resumo";
import Detalhes from "./components/Detalhes";
import Filtro from "./components/Filtro";
import Spinner from "./components/Spinner";
import ModalForm from "./components/ModalForm";
import Novo from "./components/Novo";
import ModalConfirmDelete from "./components/ModalConfirmDelete";

export default function App() {
  const date = new Date();

  const yearMonthCurrent = `${date.getFullYear()}-${(
    "0" +
    (date.getMonth() + 1)
  ).slice(-2)}`;

  const [period, setPeriod] = useState(yearMonthCurrent);
  const [yearMonthFiltered, setYearMonthFiltered] = useState([]);
  const [yearMonthSelected, setYearMonthSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    setYearMonthFiltered([]);
    const getYearMonth = async () => {
      const data = await api.getAll(period);
      setYearMonthFiltered(data);
      setYearMonthSelected(data);
      console.log(data);
    };

    if (period != null) getYearMonth();
  }, [period]);

  const handleYearMont = (selected) => {
    setPeriod(selected);
  };

  const handleFilter = (filtered) => {
    setYearMonthFiltered(filtered);
  };

  const handlePersist = (selecionado) => {
    setLaunch(selecionado);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePersistData = async (lancamentoPersist, isEdit) => {
    try {
      if (!isEdit) {
        await api.insert(lancamentoPersist);
      } else {
        await api.update(lancamentoPersist);
      }

      handleCloseModal();
      refresh();
    } catch {
      console.log("Falha ao gravar");
    }
  };

  const refresh = () => {
    const p = period;

    setPeriod(null);
    setPeriod(p);
  };

  const handleSelectedDelete = (lancamentoDelete) => {
    setLaunch(lancamentoDelete);

    setIsModalDeleteOpen(true);
  };

  const handleSelectedEdit = (lancamentoEdit) => {
    setLaunch(lancamentoEdit);
    setIsModalOpen(true);
  };

  const handlePersistDelete = async (deletar) => {
    setIsModalDeleteOpen(false);

    if (deletar) {
      try {
        await api.remove(launch._id);
        refresh();
      } catch {
        console.log("Erro ao deletar");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div style={styles.centeredTitle}>
          Desafio Final do Bootcamp Full Stack
        </div>
        <Navigate
          onChangeYearMont={handleYearMont}
          defaultPeriod={period}
        ></Navigate>
        {yearMonthFiltered.length !== 0 && (
          <Resumo yearMonths={yearMonthFiltered}></Resumo>
        )}
        {yearMonthFiltered.length === 0 && <Spinner />}
      </div>
      {yearMonthFiltered.length !== 0 && (
        <div className="container" style={{ paddingTop: "10px" }}>
          <div className="row">
            <Novo onPersist={handlePersist}></Novo>
            <Filtro
              yearMonths={yearMonthSelected}
              onFilter={handleFilter}
            ></Filtro>
          </div>
        </div>
      )}
      {yearMonthFiltered.length !== 0 && (
        <Detalhes
          yearMonths={yearMonthFiltered}
          onEdit={handleSelectedEdit}
          onDelete={handleSelectedDelete}
        ></Detalhes>
      )}
      {isModalOpen && (
        <ModalForm
          onCloseModal={handleCloseModal}
          onSave={handlePersistData}
          lancamento={launch}
        ></ModalForm>
      )}
      {isModalDeleteOpen && (
        <ModalConfirmDelete onDelete={handlePersistDelete}></ModalConfirmDelete>
      )}
    </div>
  );
}

const styles = {
  centeredTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.4em",
    paddingTop: "20px",
  },
};
