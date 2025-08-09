import React, { useState } from "react";
import "./MonthDropDown.css";
import GetExpenses from "./GetExpenses";

function MonthDropDown({ onSubmit, clear }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const months = [ "January","February","March","April","May","June","July","August", "September","October","November","December",];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(i);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedMonth && selectedYear) {
      onSubmit({ selectedMonth, selectedYear });
      console.log(selectedMonth, selectedYear);
    } else {
    }
  };

  const handleClear = () => {
    setSelectedMonth("");
    setSelectedYear("");
   
    onSubmit({ selectedMonth: null, selectedYear: null });
  };

  return (
    <form onSubmit={handleSubmit} className="month-dropdown-form">
      <label>
        Month:
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          required
        >
          <option value="">--Select Month--</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year:
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          required
        >
          <option value="">--Select Year--</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Load</button>
       <button type="button" onClick={handleClear}>
        Clear
      </button>
    </form>
  );
}

export default MonthDropDown;
