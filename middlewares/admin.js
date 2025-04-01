const { adminSecret } = require("../config");
const jwt = require("jsonwebtoken");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, adminSecret);

    if (decodedData) {
        req.userId = decodedData.id;
        next();

    } else {
        res.status(403).json({
            message: "User not found!"
        })
    }
}
//export the module 
module.exports = {
    adminMiddleware: adminMiddleware
}
