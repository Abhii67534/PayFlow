const { Budget } = require("./db");

// Function to add a transaction to a user's budget
const addTransactionToBudget = async (userId, transaction) => {
    try {
        // Find the budget associated with the user
        const budget = await Budget.findOne({ userId: userId });
        if (!budget) {
            console.error('Budget not found for user');
            return;
        }

        // Add the transaction to the budget
        budget.transactions.push(transaction);
        await budget.save();

        console.log('Transaction added successfully');
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
};

module.exports = {
    addTransactionToBudget
};
