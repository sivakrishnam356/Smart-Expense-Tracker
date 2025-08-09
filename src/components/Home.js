import React, { useState } from "react";
import AddExpense from "./AddExpense";
import GetExpenses from "./GetExpenses";
import DeleteExpense from "./DeleteExpense";
import { useContext } from "react";
import { MonthYearContext } from "../context/DateContext";
import "./Home.css";

function Home(handleDeleteConfirm) {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  const { selectedMonth, selectedYear } = useContext(MonthYearContext);

  const handleExpenseAdded = () => {
    setRefreshTrigger((prev) => prev + 1); // trigger re-fetch
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
    <main className="home">
      <section className="summary-card">
        <h3>Total Spent This Month</h3>
        <p className="total-amount">
          {" "}
          {monthlyTotal.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })}
        </p>
      </section>

      <section className="recent-expenses">
        <GetExpenses
          refreshTrigger={refreshTrigger}
          editExpense={handleEditExpense}
          deleteExpense={handleDeleteClick}
          monthlyTotal={setMonthlyTotal}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </section>

      {/* Floating + Add Button */}
      <div className="floating-add-btn">
        <button className="btn btn-primary plusButton" onClick={openModal}>
          +
        </button>

        {/* Modal should appear here */}
        {showModal && (
          <AddExpense
            show={showModal}
            onClose={closeModal}
            onExpenseAdded={handleExpenseAdded}
            initialData={selectedExpense}
          />
        )}
      </div>

      <section className="delete-expense">
        <DeleteExpense
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDeleteConfirm={handleDeleteConfirm}
          expense={expenseToDelete}
        />
      </section>
    </main>
  );
}

export default Home;
