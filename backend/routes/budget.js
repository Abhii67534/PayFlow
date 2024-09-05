const express = require("express");

const { budgetModel } = require("../db");


const router = express.Router();

router.post("/transaction", async (req, res) => {
    const { name, type, amount } = req.body;
    console.log(req.body);

    await budgetModel.create({
        transName: name,
        type: type,
        amount: amount
    })
    return res.status(200).json({ msg: "Transaction added to db" })
})


router.get("/list", (req, res) => {
    budgetModel.find({})
    .then(allTrans => {
        res.status(200).json(allTrans);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching transactions." });
    });
});


module.exports = router;