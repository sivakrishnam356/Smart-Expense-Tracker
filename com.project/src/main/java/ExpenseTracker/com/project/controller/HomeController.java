package ExpenseTracker.com.project.controller;

import ExpenseTracker.com.project.model.Expense;
import ExpenseTracker.com.project.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/expenses")
public class HomeController {

    private final ExpenseService expenseService;

    // Constructor Injection
    @Autowired
    public HomeController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Adding expense method
    @PostMapping
    public ResponseEntity<String> addExpense(@RequestBody Expense expense) {
        try {
            expenseService.addExpense(expense);
            return ResponseEntity.status(HttpStatus.CREATED).body("Expense added successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add expense.");
        }
    }

    // Get  all expense method
    @GetMapping("/allexpenses")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        try {
            List<Expense> expenses = expenseService.getAllExpenses();
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get expense by id method
    @PutMapping("/{expenseId}")
    public ResponseEntity<String> updateExpense(@PathVariable Long expenseId, @RequestBody Expense updatedExpense) {
        try {
            expenseService.updateExpense(expenseId, updatedExpense);
            return ResponseEntity.ok("Expense updated successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Expense not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update expense.");
        }
    }

    // Delete expense by id method
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable Long expenseId) {
        try {
            expenseService.deleteExpense(expenseId);
            return ResponseEntity.ok("Expense deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete expense.");
        }
    }
}
