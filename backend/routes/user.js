const express = require("express");
const jwt = require("jsonwebtoken");
const { mySchema, signin } = require("../authentication/auth");
const { User, Bank, Budget } = require("../db");
const { authMiddleware } = require("../authentication/middleware");
const JWT_SECRET = "abhi1234";

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
    const data = req.body;
    const parseData = mySchema.safeParse(data);
    if (!parseData.success) {
        return res.status(411).json({ msg: "You sent the wrong info" });
    }

    const lowercaseEmail = data.userName.toLowerCase();
    console.log("email ", lowercaseEmail);

    try {
        const existingUser = await User.findOne({ userName: lowercaseEmail });
        if (existingUser) {
            return res.status(411).json({ msg: "User already in database" });
        } else {
            const newUser = await User.create({
                userName: lowercaseEmail,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password
            });
            const userid = newUser._id;

            // Create bank record
            await Bank.create({
                userId: userid,
                balance: Math.random() * 9999 + 1
            });

            // Create budget for the new user
            await Budget.create({
                userId: userid,
                transactions: [] 
            });

            const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
            return res.status(200).json({
                message: "User created successfully",
                token: token
            });
        }
    } catch (err) {
        console.error('Error during signup:', err);
        return res.status(500).json({ msg: "Server error" });
    }
});

// User Signin
router.post("/signin", async (req, res) => {
    const { userName, password } = req.body;
    console.log(req.body);

    const lowercase = userName.toLowerCase();
    console.log(lowercase);

    const parseobj = signin.safeParse(req.body);
    if (!parseobj.success) {
        return res.status(400).json({ msg: "You entered wrong inputs" });
    }

    try {
        const existUser = await User.findOne({ userName: lowercase });
        if (!existUser) {
            return res.status(401).json({ msg: "No user found" });
        }

        if (password !== existUser.password) {
            return res.status(401).json({ msg: "You entered the wrong password" });
        }

        const token = jwt.sign({ userId: existUser._id }, JWT_SECRET);

        const userAccount = await Bank.findOne({ userId: existUser._id });
        if (userAccount) {
            const balance = userAccount.balance;
            return res.status(200).json({ msg: "Signin successful", token: token, balance: balance, userId: existUser._id });
        }

    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Retrieve Users based on search query
router.get("/bulk", async (req, res) => {
    try {
        const query = req.query.filter;

        const users = await User.find({
            $or: [
                { 'firstName': { $regex: query, $options: 'i' } },
                { 'lastName': { $regex: query, $options: 'i' } }
            ]
        });

        if (!users.length) {
            return res.status(404).json({ msg: "No users found" });
        }

        res.status(200).json({
            users: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// Retrieve all users
router.get("/userinfo", async (req, res) => {
    try {
        const users = await User.find({});
        if (!users.length) {
            return res.status(404).json({ msg: "No users found" });
        }

        res.status(200).json({
            users: users.map(user => ({
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
