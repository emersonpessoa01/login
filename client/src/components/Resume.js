import React from "react";

export default function Resume({ yearMonths }) {
  const getRecipe = () => {
    const recipe = yearMonths.reduce((acc, cur) => {
      if (cur.type === "+") return acc + cur.value;

      return acc;
    }, 0);

    return recipe.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  };

  const getExpense = () => {
    const expense = yearMonths.reduce((acc, cur) => {
      if (cur.type === "-") return acc + cur.value;

      return acc;
    }, 0);

    return expense.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  };

  const getBalance = () => {
    const receitas = yearMonths.reduce((acc, cur) => {
      if (cur.type === "+") return acc + cur.value;
      else return acc - cur.value;
    }, 0);

    return receitas.toLocaleString("pt-br", { minimumFractionDigits: 2 });
  };

  const { details } = styles;
  return (
    <div style={details}>
      <div className="row">
        <div className="col s3" style={{ textAlign: "left" }}>
          Lançamentos: {yearMonths.length}
        </div>
        <div className="col s3" style={{ textAlign: "center" }}>
          Receitas: <span style={{ color: "#171395" }}>R$ {getRecipe()}</span>
        </div>
        <div className="col s3" style={{ textAlign: "center" }}>
          Despesas: {/* <span style={{ color: "#B285D1" }}> */}
          <span style={{ color: "#9897FF" }}>R$ {getExpense()}</span>
        </div>
        <div className="col s3" style={{ textAlign: "right" }}>
          Saldo:{" "}
          <span
            style={{
              color: !getBalance().startsWith("-") ? "#008080" : "#9897FF",
            }}
          >
            R$ {getBalance()}
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  details: {
    paddingTop: "20px",
    border: "1px solid gray",
    borderRadius: "5px",
    fontWeight: "bold",
  },
};
