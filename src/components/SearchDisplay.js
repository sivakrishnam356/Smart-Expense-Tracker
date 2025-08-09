import React, { useState,useEffect } from "react";
import "./SearchDisplay.css";
function SearchDisplay({
  searchInput,
  expenses,
  editExpense ,
  deleteExpense,
}) {
  const [searchInputTotal, setSearchInputTotal] = useState(0);
  useEffect(() => {
    const filteredExpenses = expenses.filter((expense) =>
      expense.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    const total = filteredExpenses.reduce(
      (sum, item) => sum + parseFloat(item.amount),
      0
    );

    setSearchInputTotal(total);
  }, [expenses, searchInput]);

  return (
    <>
      <section className="summary-card1">
        <h3>Total Spent On {searchInput}</h3>
        <p className="total-amount">
          
          {searchInputTotal.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </section>

      <div className="search-container">
        <h2>Search Expenses</h2>
        <div className="expense-grid">
          {expenses
            .filter((expense) =>
              expense.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((expense, index) => (
              <div className="expense-card" key={index}>
                <div className="expense-icons">
                  <button
                    className="icon-button edit-btn"
                    title="Edit"
                    onClick={() => editExpense(expense)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="icon-button delete-btn"
                    title="Delete"
                    onClick={() => deleteExpense(expense)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
                <h3>{expense.title}</h3>
                <p>₹ {expense.amount}</p>
                <p>{expense.date}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchDisplay;
