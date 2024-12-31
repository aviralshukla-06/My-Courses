const { userSecret } = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, userSecret);

    if (decodedData) {
        req.userId = decodedData.id;
        next();

    } else {
        res.status(403).json({
            message: "User not found!"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}