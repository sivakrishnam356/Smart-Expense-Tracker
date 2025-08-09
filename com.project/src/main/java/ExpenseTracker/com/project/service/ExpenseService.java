package ExpenseTracker.com.project.service;

import ExpenseTracker.com.project.model.Expense;
import ExpenseTracker.com.project.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

   //  Add a new expense
    public void addExpense(Expense expense) {
        expenseRepository.save(expense);
    }

    // Update an existing expense by ID
    @Transactional
    public void updateExpense(Long expenseId, Expense updatedExpense) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found with ID: " + expenseId));

        expense.setTitle(updatedExpense.getTitle());
        expense.setDate(updatedExpense.getDate());
        expense.setAmount(updatedExpense.getAmount());
        expense.setDescription(updatedExpense.getDescription());

    }

    //  Delete an expense by ID
    public void deleteExpense(Long expenseId) {
        if (!expenseRepository.existsById(expenseId)) {
            throw new RuntimeException("Expense not found with ID: " + expenseId);
        }
        expenseRepository.deleteById(expenseId);
    }

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }
}
