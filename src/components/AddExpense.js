import React, { useState, useEffect } from "react";
import "./AddExpense.css";

const AddExpense = ({ show, onClose, onExpenseAdded, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    amount: initialData?.amount || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });

  useEffect(() => {
    setFormData({
      title: initialData?.title || "",
      amount: initialData?.amount || "",
      date: initialData?.date || "",
      description: initialData?.description || "",
    });
  }, [initialData]);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(initialData);
    const url = initialData
      ? `http://localhost:8080/api/expenses/${initialData.id}`
      : "http://localhost:8080/api/expenses";

    const method = initialData ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        alert("Success");
        onExpenseAdded();
      } else {
        alert("Gone");
      }
    } catch (error) {
      console.error();
    }
    onClose();
  };

  return (
    <div className="modal-overlay" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content custom-modal">
          <div className="modal-header d-flex align-items-center">
            <h5 className="modal-title text-primary m-0">
              {initialData ? "Edit Expense" : "Add Expense"}
            </h5>
            <button
              type="button"
              className="btn-close ms-auto"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="hidden"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Name"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price (₹)
                   <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date
                   <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  placeholder="Enter Description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
