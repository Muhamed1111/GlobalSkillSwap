import React from "react";
import "./table.css"
const Table = ({ head = [], fields = [], array = [], title }) => {
  // 🔹 Umjesto createElement, koristimo JSX
  function createTable(head, data) {
    const thead = [];
    const tbody = [];

    // 🔸 Kreiramo header red
    const headerCells = [];
    for (let i = 0; i < head.length; i++) {
      headerCells.push(<th key={`head-${i}`}>{head[i]}</th>);
    }
    thead.push(<tr key="header-row">{headerCells}</tr>);

    // 🔸 Kreiramo redove podataka
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const currentRow = [];
        for (let j = 0; j < fields.length; j++) {
          const key = fields[j];
          currentRow.push(<td key={`cell-${i}-${j}`}>{data[i][key]}</td>);
        }
        tbody.push(<tr key={`row-${i}`}>{currentRow}</tr>);
      }
    } else {
      tbody.push(
        <tr key="empty">
          <td colSpan={head.length} style={{ textAlign: "center" }}>
            Nema podataka
          </td>
        </tr>
      );
    }

    // 🔹 Vraćamo JSX elemente koje React zna prikazati
    return (
      <table className="custom-table">
        <caption>{title}</caption>
        <thead>{thead}</thead>
        <tbody>{tbody}</tbody>
      </table>
    );
  }

  // 🔹 Glavni return
  return <div className="table-container">{createTable(head, array)}</div>;
};

export default Table;
