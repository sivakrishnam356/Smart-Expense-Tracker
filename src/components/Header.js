import React, { useState, useEffect } from "react";
import MonthDropDown from "./MonthDropDown";
import { useContext } from "react";
import { MonthYearContext } from "../context/DateContext";
import "./Header.css";

function Header({ onSearch, onClearSearch }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);

  const { setSelectedMonth, setSelectedYear } = useContext(MonthYearContext);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses/allexpenses")
      .then((res) => res.json())
      .then((data) => setAllExpenses(data));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setSuggestions([]);
      onClearSearch(); // clear result
      return;
    }

    const filtered = allExpenses.filter((expense) =>
      expense.title.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleSelect = (title) => {
    setInput(title);
    setSuggestions([]);
    onSearch(title); // send selected item to App
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuggestions([]);
    if (input.trim() !== "") {
      onSearch(input);
    }
  };

  const onSubmit = ({ selectedMonth, selectedYear }) => {
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);
    console.log(selectedMonth, selectedYear);
  };

  const clear = ({ selectedMonth, selectedYear }) => {
    setSelectedMonth(selectedMonth);
    setSelectedYear(selectedYear);
  };

  return (
    <header className="header">
      <div className="logo">ExpenseTracker</div>

      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="search-input"
            placeholder="Search expenses..."
            value={input}
            onChange={handleChange}
          />
          {input && (
            <i
              className="bi bi-x clear-icon"
              onClick={() => {
                setInput("");
                setSuggestions([]);
                onClearSearch(); // also clears result
              }}
            ></i>
          )}
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => handleSelect(s.title)}>
                  {s.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <nav className="nav">
        <MonthDropDown onSubmit={onSubmit} clear={clear} />
        <span>Hello, Siva!</span>
      </nav>
    </header>
  );
}

export default Header;
