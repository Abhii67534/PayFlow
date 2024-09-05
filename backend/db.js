const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://dbUser:Abhi1999@cluster0.qfy9uri.mongodb.net/")
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


// User Schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Bank Schema
const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Bank = mongoose.model("Bank", bankSchema);

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    transName: { type: String, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true }, // Changed to Number for proper calculations
    date: {
        type: Date,
        default: Date.now
    }
});

// Budget Schema
const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    transactions: [transactionSchema] // Embedding transactions array
});

const Budget = mongoose.model("Budget", budgetSchema);

// Export the models
module.exports = {
    User,
    Bank,
    Budget
};
