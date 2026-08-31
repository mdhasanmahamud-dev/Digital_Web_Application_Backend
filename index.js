const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

//-----------------------Import Routes----------------------//
const userRouter = require("./src/routes/user.route");
const contactRouter = require("./src/routes/contact.route");
const projectRouter = require("./src/routes/project.route");
const teamRouter = require("./src/routes/team.route");

const app = express();

//--------------------Mongodb Connected---------------------//
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//----------------Application Running Port------------------//
const port = process.env.PORT;



//-----------------------Use Route------------------------//
app.use("/api", userRouter);
app.use("/api", contactRouter);
app.use("/api", projectRouter);
app.use("/api", teamRouter)

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log("Server running on port 5000");
});
