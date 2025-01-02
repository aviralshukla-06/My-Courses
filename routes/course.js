const { Router } = require("express");
const courseRouter = Router();

const { courseModel, purchaseModel } = require("../db")



courseRouter.post("/purchase", userMiddleware, async function (req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    if (!courseId) {
        res.json({
            message: "This course does not exist"
        })
    } else {
        res.json({
            message: "You have successfully purchased the course" + courseId
        })
    }

})


// courseRouter.get("/preview", function (req, res) {
//     res.json({
//         message: "Hi there!"
//     })
// });




module.exports = {
    courseRouter: courseRouter
}