import React, { useState } from "react";
import * as apiService from "./api/ApiService"
import axios from "axios";
import FormSearch from "./FormSearch"
import CreateGrade from "./components/CreateGrade"
import CountBalance from "./components/CountBalance"
import Spinner from "./components/Spinner"
import GradesControl from "./components/GradesControl"
import ModalGrade from "./components/ModalGrade"

const api = axios.create({
  baseURL: "api",
  headers: {
    "Content-type": "application/json",
  },
});

export default function App() {
  const [allGrades, setAllGrades] = React.useState([]);
  const [yearMonth, setYearMonth] = React.useState("2019-01");
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleActionAllGrades = (data) => {
    setAllGrades(data);
  };

  const handleActionYearMonth = (data) => {
    setYearMonth(data);
  };

  const handleClearGrades = () => {
    setAllGrades([]);
  };


  //apiservice

  

  const handleDelete = async (gradeToDelete) => {
    const isDeleted = await apiService.deleteGrade(gradeToDelete);

    if (isDeleted) {
      const deletedGradeIndex = allGrades.findIndex(
        (grade) => grade === gradeToDelete
      );
      const newGrades = Object.assign([], allGrades);
      newGrades.splice(deletedGradeIndex, 1);
      setAllGrades(newGrades);
    }
  };

  const handlePersist = (grades) => {
    setSelectedGrade(grades);

    setIsModalOpen(true);
  };

  const handlePersistData = async (formData) => {
    const { id } = formData;
    const newGrades = Object.assign([], allGrades);

    let gradeToPersist = null;

    if (id !== undefined) {
      gradeToPersist = newGrades.find(({ _id }) => _id === id);
      gradeToPersist = formData;

      const deletedGradeIndex = newGrades.findIndex(
        (grade) => grade._id === id
      );
      newGrades.splice(deletedGradeIndex, 1);
      await apiService.updateGrade(gradeToPersist);

      newGrades.push(formData);
    } else {
      gradeToPersist = formData;
      console.log(formData);

      const valueInsert = await apiService.insertGrade(gradeToPersist);
      newGrades.push(valueInsert);
    }
    setAllGrades(newGrades);
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (filter) => {
    const filterLowerCase = filter.toLowerCase();

    const filtereLaçamenteos = allGrades.filter(({ description }) => {
      const newDescription = description.toLowerCase();
      return newDescription.includes(filterLowerCase);
    });

    setAllGrades(filtereLaçamenteos);
  };

  return (
    <div className="container" style={styles.containerBody}>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <h2> Bootcamp Full Stack - Desafio Final</h2>
        <h4>Controle Financeiro</h4>
      </div>
      <hr />
      {!isModalOpen && (
        <FormSearch
          yearMonth={yearMonth}
          onPersist={handleActionAllGrades}
          actionYearMonth={handleActionYearMonth}
          clearGrades={handleClearGrades}
        />
      )}
      <CountBalance grades={allGrades} />
      {!isModalOpen && (
        <CreateGrade
          onPersist={handlePersist}
          grades={allGrades}
          filter={handleFilter}
        />
      )}

      {allGrades.length === 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
      {isModalOpen && (
        <ModalGrade
          onSave={handlePersistData}
          onClose={handleClose}
          selectedGrade={selectedGrade}
        />
      )}
    </div>
  );
}

const styles = {
  containerBody: {
    backgroundColor: "white",
    padding: "15px",
  },
};
