import React, { useState, useEffect } from "react";

export default function rascunho() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const currentYearMonth = `${year} - ${month}.toString().padStart(2, "0")`;

  const [period, setPeriod] = useState(currentYearMonth);
  const [yearMonthFiltered, setYearMonthFiltered] = useState([]);
  const [yearMonthSelected, setYearMonthSelected] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [launch, setLaunch] = useState(null);

  useEffect(() => {
    setYearMonthFiltered([]);

    const getYearMonth = async () => {
      const data = await api.getAll(period);
      setYearMonthFiltered([]);
      setYearMonthSelected(data);
      console.log(data);
    };

    if (period !== null) {
      return getYearMonth();
    }
  }, [period]);

  const handleYearMonth = (selected) => {
    setPeriod(selected);
  };

  const handleFilter = (filtered) => {
    setYearMonthFiltered(filtered);
  };

  const handlePersist = (selected) => {
    setlaunchSelected(selected);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePersistData = async (launchPersist, isEdit) => {
    try {
      if (!isEdit) {
        await api.insert(launchPersist);
      } else {
        await api.update(launchPersist);
      }
      handlePersistData();
      refresh();
    } catch (err) {
      console.log("Erro ao gravar");
    }
  };

  const refresh = (period) => {
    setperiod(null);
    setPeriod(period);
  };

  const handleSelectedDelete = (launchDelete) => {
    setLaunch(launchDelete);
    setIsModalDeleteOpen(true);
  };

  const handleSelectedEdit = (launchEdit) => {
    setlaunch(launchEdit);
    setisModalOpen(true);
  };

  const handelPersistDelete = async (deleted) => {
    setYearMonthFiltered(false);

    if (deleted) {
      try {
        await api.delete(launch._id);
        refresh();
      } catch (e) {
        console.log("Erro ao deletar");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div style={styles.centeredTitle}>
          Desafio Final - Bootcamp Full Stack
        </div>

        <Navigate defaultPeriod={period} onChangeYearMonth={handleYearMonth} />

        {yearMonthFiltered.length !== 0 && (
          <Resume yearMonths={yearMonthFiltered} />
        )}

        {yearMonthFiltered.length === 0 && <Spinner />}
      </div>

      {yearMonthFiltered.length === 0 && (
        <div className="container" style={styles.centeredTitle}>
          <div style={styles.row}>
            <New onPersist={handlePersist} />
            <Filter yearMonths={yearMonthSelected} onFilter={handleFilter} />
          </div>
        </div>
      )}

      {yearMonthFiltered.length !== 0 && (
        <Details
          yearMonths={yearMonthFiltered}
          onEdit={handleSelectedEdit}
          onDelete={handleSelectedDelete}
        />
      )}

      {isModalOpen && (
        <ModalForm
          onLaunch={launch}
          onSave={handlePersistData}
          onCloseModal={handleCloseModal}
        />
      )}

      {isModalDeleteOpen && (
        <ModalDeleteConfirm onDelete={handlePersistDelete} />
      )}
    </div>
  );
}

const styles = {
  centeredTitle: {
    alignItems: "center",
    fontSize: "1.4em",
    fontFamily: "Righteous",
    fontWeight: "bold",
    color: "#171395",
    paddingTop: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "5px",
    paddingBottom: "8px",
  },
};
