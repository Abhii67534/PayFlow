const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://dbUser:Abhi1999@cluster0.qfy9uri.mongodb.net/")

const userSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    password: String
})

const user = mongoose.model("users", userSchema)

const bankSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const bankModel = mongoose.model("bank", bankSchema)


const budgetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    transName: String,
    type: String,
    amount: String,
    date: {
        type: Date,
        default: Date.now
    },
})
const budgetModel = mongoose.model("budget", budgetSchema)

module.exports = {
    user,
    bankModel,
    budgetModel
}


