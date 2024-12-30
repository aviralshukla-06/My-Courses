const { Router } = require("express");
const userRouter = Router();

const { userModel } = require("../db")



userRouter.post("/signup", function (req, res) {

});

userRouter.post("/signin", function (req, res) {

});


userRouter.get("my-purchase", function (req, res) {

})

module.exports = {
    userRouter: userRouter
}