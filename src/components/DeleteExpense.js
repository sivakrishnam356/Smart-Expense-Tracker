import React from "react";
import "./DeleteExpense.css";

function DeleteExpense({ show, onClose, onDeleteConfirm, expense }) {
  if (!show) return null;

  return (
    <div className="modal-overlay1">
      <div className="modal-content1">
        <h3>Delete Expense</h3>
        <p>Are you sure you want to delete <strong>{expense.title}</strong>?</p>
        <div className="modal-buttons">
          <button className="btn btn-danger" onClick={() => onDeleteConfirm(expense.id)}>
            Yes, Delete
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteExpense;
