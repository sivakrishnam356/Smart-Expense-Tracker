import React, { useEffect, useState } from "react";
import "./GetExpenses.css";

function GetExpenses({
  refreshTrigger,
  editExpense,
  deleteExpense,
  monthlyTotal,
  selectedMonth,
  selectedYear,
}) {
  const [expenses, setExpenses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses/allexpenses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        return response.json();
      })
      .then((data) => {
        const now = new Date();
        const month = selectedMonth
          ? parseInt(selectedMonth) - 1
          : now.getMonth(); // JS month: 0-based
        const year = selectedYear ? parseInt(selectedYear) : now.getFullYear();

        const filteredExpenses = data.filter((expense) => {
          const expenseDate = new Date(expense.date);
          return (
            expenseDate.getMonth() === month &&
            expenseDate.getFullYear() === year
          );
        });
        // Monthly Total to display in the Home component..
        const total = filteredExpenses.reduce(
          (sum, item) => sum + parseFloat(item.amount),
          0
        );
        monthlyTotal(total);
        setExpenses(filteredExpenses);
        console.log("Fetched expenses:", filteredExpenses);
        console.log(month,year);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, [refreshTrigger,selectedMonth,selectedYear]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); // show 5 more
  };

  return (
    <>
      <div className="expense-container">
        <h2>Recent Expenses</h2>
        <div className="expense-grid">
          {expenses.slice(0, visibleCount).map((expense, index) => (
            <div className="expense-card" key={index}>
              <div className="expense-icons">
                <button
                  className="icon-button edit-btn"
                  title="Edit"
                  onClick={() => {
                    editExpense(expense);
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button
                  className="icon-button delete-btn"
                  title="Delete"
                  onClick={() => {
                    deleteExpense(expense);
                  }}
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
      {visibleCount < expenses.length && (
        <div className="load-more-container">
          <button onClick={handleLoadMore} className="load-more-btn">
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default GetExpenses;
