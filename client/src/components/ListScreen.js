import React from "react";

const EARNING_COLOR = "#0094ff";
const EXPENSE_COLOR = "#9897FF";

export default function ListScreen({
  transactions,
  periods,
  filteredText,
  currentPeriod,
  onDeleteTransaction,
  onEditTransaction,
  onFilterChange,
  onPeriodChange,
}) {
  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const numberFormatter = (number) => {
    return formatter.format(number);
  };

  const { transactionStyle, buttonEditar } = styles;

  return (
    <>
      <select
        className="browser-default"
        value={currentPeriod}
        onChange={onPeriodChange}
      >
        {periods.map((period) => {
          return <option>{period}</option>;
        })}
      </select>

      <input
        type="text"
        autoFocus={true}
        placeholder="Escreva a categoria..."
        value={filteredText}
        onChange={onFilterChange}
      />

      {transactions.map(
        ({ _id, yearMonthDay, category, description, value, type }) => {
          const currentColor = type === "+" ? EARNING_COLOR : EXPENSE_COLOR;

          return (
            <div
              key={_id}
              style={{ ...transactionStyle, backgroundColor: currentColor }}
            >
              <span style={buttonEditar}>
                <button
                  className="waves-effect waves-light btn"
                  onClick={onEditTransaction}
                  id={_id}
                >
                  Editar
                </button>
              </span>
              <span>
                <button
                  className="waves-effect waves-light btn red darken-4"
                  onClick={onDeleteTransaction}
                  id={_id}
                >
                  X
                </button>
              </span>
              <span style={{ margin: 7 }}>
                {yearMonthDay}-<strong>{category}</strong>-{description}-
                {numberFormatter(value)}
              </span>
            </div>
          );
        }
      )}
    </>
  );
}

const styles = {
  transactionStyle: {
    padding: "5px",
    margin: "5px",
    border: "1px solid lightgray",
    borderRadius: "5px",
  },
  buttonEditar: {
    margin: "4px",
  },
};
