import React from 'react';
import css from './css/Count.module.css';
import { formatMoney } from "./FormatValue";

export default function CountBalance({ grades }) {
  let counterReleases = 0;
  let balance = 0;
  let expenses = 0;
  let recipe = 0;
  let gradeStyle = '';

  const counter = grades.forEach(({ type, value }) => {
    counterReleases++;
    if (type === '+') {
      balance = balance + value;
      recipe = recipe + value;
    } else {
      expenses = expenses + value;
      balance = balance - value;
    }

    gradeStyle = balance >= 0 ? css.goodGrade : css.badGrade;
  });

  return (
    <div className={css.modalBody}>
      {grades.length > 0 && counter}
      <hr />
      <div className="row">
        <div className="col s3">
          <b>Lançamentos: </b> {counterReleases}
        </div>
        <div className="col s3">
          <b> Receita: </b>
          <span className={css.goodGrade}>{formatMoney(recipe)} </span>{' '}
        </div>
        <div className="col s3">
          <b> Despesas: </b>{' '}
          <span className={css.badGrade}>{formatMoney(expenses)} </span>{' '}
        </div>
        <div className="col s3">
          <b> Saldo: </b>{' '}
          <span className={gradeStyle}>{formatMoney(balance)} </span>{' '}
        </div>
      </div>
      <br />
    </div>
  );
}
