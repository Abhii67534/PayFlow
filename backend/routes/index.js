const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const accountRouter = require("./account")
const budgetRouter = require("./budget")

router.use("/user", userRouter);
router.use("/account",accountRouter)
router.use("/budget",budgetRouter)

module.exports = router;
