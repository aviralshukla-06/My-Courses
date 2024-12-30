const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const secret = "heymahavirKaroK$lyan";
const bcrypt = require("bcryptjs");
const { z } = require("zod");

app.use(express.json());

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use("/api/v1/user", userRouter);
console.log("sent req");
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);


async function main() {
    await mongoose.connect("");
    app.listen(3000);

    // add mongo path
}

main();
console.log("logging");
