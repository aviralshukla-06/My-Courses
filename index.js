const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();


app.use(express.json());

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")



app.use("/api/v1/user", userRouter);
console.log("sent req");
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);

    // add mongo path
}

main();
console.log("logging");
