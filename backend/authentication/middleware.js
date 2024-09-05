const jwt = require('jsonwebtoken');
const JWT_SECRET = "abhi1234"

const authMiddleware = (req, res, next) => {
    const header = req.headers.authorization;  
    console.log(header);
    

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(411).json({ msg: "Wrong inputs auth middleware" });
    }

    const token = header.split(" ")[1];


    try {
        const decoded = jwt.verify(token, JWT_SECRET);


        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({ msg: "Forbidden" });
        }
    } catch (error) {
        return res.status(403).json({ msg: "Invalid token" });
    }
};

module.exports = {
    authMiddleware
};
