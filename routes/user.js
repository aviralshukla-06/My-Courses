const { Router, json } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const { userSecret } = require("../config");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const { userMiddleware } = require("../middlewares/user")

const { userModel } = require("../db")


userRouter.post("/signup", async function (req, res) {
    // const { email, password, firstName, lastName } = req.body;

    const reqBody = z.object({
        email: z.string().min(10).max(100).email(),
        password: z.string().min(5).max(100),
        firstName: z.string().min(5).max(100),
        lastName: z.string().min(5).max(100)
    })



    const parsedReqBody = reqBody.safeParse(req.body);
    console.log(parsedReqBody);
    const errorMsg = parsedReqBody.error;

    if (!parsedReqBody.success) {
        res.status(403).json({
            message: errorMsg.issues
        })
        return;
    }

    const { email, password, firstName, lastName } = parsedReqBody.data;
    const hashedPass = await bcrypt.hash(password, 5);


    try {
        await userModel.create({
            email,
            password: hashedPass,
            firstName,
            lastName
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "An error occurred while creating the user"
        });
        return;
    }


    res.json({
        message: "You have successfully signed-up"
    })



});

userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    })

    if (!user) {
        res.status(403).json({
            message: "User does Not exist."
        });
    }


    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: user._id
        }, userSecret);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect details."
        })
    }

});


userRouter.get("my-purchase", userMiddleware, function (req, res) {

})

module.exports = {
    userRouter: userRouter
}