const express = require("express");
const { addTransactionToBudget } = require("../budgetService");
const { authMiddleware } = require("../authentication/middleware");
const { Budget } = require("../db");

const router = express.Router();

// Middleware to ensure the user is authenticated
router.use(authMiddleware);

// Add a new transaction
router.post("/transaction", async (req, res) => {
    const { name, type, amount } = req.body;
    const userId = req.userId; // Extracted from the token

    try {
        // Create the transaction object
        const transaction = {
            transName: name,
            type: type,
            amount: amount
        };

        // Add the transaction using the service function
        await addTransactionToBudget(userId, transaction);

        return res.status(200).json({ msg: "Transaction added to budget" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "An error occurred while adding the transaction." });
    }
});


// List all transactions for the authenticated user
router.get("/list", async (req, res) => {
    const userId = req.userId; // Corrected from req.userid to req.userId
    console.log("USERRRRRRRR", userId);

    try {
        // Find the user's budget
        const budget = await Budget.findOne({ userId: userId });
        if (!budget) {
            return res.status(404).json({ msg: "Budget not found for user" });
        }

        // Return the transactions from the user's budget
        return res.status(200).json(budget.transactions);
    } catch (err) {
        console.error("Error fetching transactions:", err); // Improved error logging
        return res.status(500).json({ error: "An error occurred while fetching transactions." });
    }
});


module.exports = router;
