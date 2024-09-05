const express = require("express");
const { default: mongoose } = require("mongoose");
const { user, bankModel } = require("../db");
const { authMiddleware } = require("../authentication/middleware");

const router = express.Router()


router.get("/balance",authMiddleware, async (req, res) => {
    const userid = req.userId;
    console.log(userid)
    const existAccount = await bankModel.findOne({ userId: userid })

    if (existAccount) {
        const balance = existAccount.balance;
        res.status(200).json({ balance: balance })
    }
    else {
        res.status(411).json({ msg: "User not found" })
    }
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const recieverId = req.body.to;
    const amount = req.body.amount
    const senderId = req.userId

    const session = await mongoose.startSession();
    session.startTransaction()
    /////verifying sender details and bank balance /////////////

    const existSender = await bankModel.findOne({ userId: senderId }).session(session);

    if (!existSender) {
        await session.abortTransaction();
        return res.status(400).json({ msg: "Sender not found" })
    }

    if (existSender.balance < amount) {
        await session.abortTransaction();
        res.status(411).json({ msg: "Insufficient balance" })
    }

    const existReciever = await bankModel.findOne({ userId: recieverId }).session(session);;

    if (!existReciever) {
        await session.abortTransaction();
        return res.status(411).json({ msg: "Reciever not found" })
    }

   await  bankModel.updateOne({
        userId: senderId
    }, {
        $inc: {
            balance: -amount
        }
    }).session(session);

   await bankModel.updateOne({
        userId: recieverId
    }, {
        $inc: {
            balance: +amount
        }
    }).session(session);
    session.commitTransaction()
    session.endSession();  // End the session
    return res.status(200).json({ msg: "Transaction successfull",balance:existSender.balance })


})
module.exports = router;