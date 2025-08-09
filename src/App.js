import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import SearchDisplay from "./components/SearchDisplay";
import DeleteExpense from "./components/DeleteExpense";
import AddExpense from "./components/AddExpense";
import "./App.css";
import { MonthYearProvider } from "./context/DateContext";

function App() {
  const [input, setInput] = useState("");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/expenses/allexpenses")
      .then((res) => res.json())
      .then((data) => setAllExpenses(data));
  }, [refreshTrigger]);

  const handleDeleteConfirm = (id) => {
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("Expense deleted successfully");
          setShowDeleteModal(false);
          setRefreshTrigger((prev) => prev + 1);
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((err) => {
        console.error("Delete failed:", err);
      });
  };

  const handleExpenseAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // trigger re-fetch
  };

  const handleSearch = (searchText) => {
    setInput(searchText);
    setSearchSubmitted(true);
  };

  const handleClearSearch = () => {
    setInput("");
    setSearchSubmitted(false);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  const handleDeleteClick = (expense) => {
    setExpenseToDelete(expense);
    setShowDeleteModal(true);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <MonthYearProvider>
        <Header onSearch={handleSearch} onClearSearch={handleClearSearch} />
        <main>
          {searchSubmitted ? (
            <SearchDisplay
              searchInput={input}
              expenses={allExpenses}
              editExpense={handleEditExpense}
              deleteExpense={handleDeleteClick}
            />
          ) : (
            <Home handleDelete={handleDeleteConfirm} />
          )}

          {showModal && (
            <AddExpense
              show={showModal}
              onClose={closeModal}
              onExpenseAdded={handleExpenseAdded}
              initialData={selectedExpense}
            />
          )}

          <DeleteExpense
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDeleteConfirm={handleDeleteConfirm}
            expense={expenseToDelete}
          />
        </main>
      </MonthYearProvider>
    </>
  );
}

export default App;
