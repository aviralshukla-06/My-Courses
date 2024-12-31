const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminSecret } = require("../config");
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const { adminMiddleware } = require("../middlewares/admin")

const { adminModel, courseModel } = require("../db")


adminRouter.post("/signup", async function (req, res) {

    const reqBody = z.object({
        email: z.string().min(10).max(100).email(),
        password: z.string().min(5).max(100),
        firstName: z.string().min(5).max(100),
        lastName: z.string().min(5).max(100)
    })



    const parsedReqBody = reqBody.safeParse(req.body);
    // console.log(parsedReqBody);
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
        await adminModel.create({
            email,
            password: hashedPass,
            firstName,
            lastName
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "An error occurred while creating the admin"
        });
        return;
    }



    res.json({
        message: "You have successfully signed-up"
    })
});

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;


    const admin = await adminModel.findOne({
        email: email
    })


    if (!admin) {
        res.status(403).json({
            message: "admin does Not exist."
        });
    }



    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: admin._id
        }, adminSecret);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect details."
        })
    }
});


adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = req.userId;

    const { title, description, price, imageUrl, creatorId } = req.body;

    const coure = await courseModel.create({

        title: String,
        description: String,
        price: Number,
        imageUrl: String,
        creatorId: adminId

    })

    res.json({
        message: "Course created.",
        creatorId: coure._id
    })
});

adminRouter.put("/course", function (req, res) {

});


adminRouter.get("/course", function (req, res) {

})




module.exports = {
    adminRouter: adminRouter
}