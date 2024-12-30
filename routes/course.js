const { Router } = require("express");
const courseRouter = Router();

const { courseModel } = require("../db")

courseRouter.post("/purchase", function (req, res) {

});

courseRouter.get("/preview", function (req, res) {
    res.json({
        message: "Hi there!"
    })
});




module.exports = {
    courseRouter: courseRouter
}