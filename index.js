const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();


app.use(express.json());

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin");
const { courseModel } = require("./db");

app.get("/", async function (req, res) {
    // const adminId = req.userId;

    const courses = await courseModel.find({})

    // let courses = [];

    // for(let i=0; i<courseModel.length; i++){

    // }

    res.json({
        courses
    })
})

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);

    // add mongo path
}

main();
console.log("logging");
