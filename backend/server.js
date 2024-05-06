const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const prodRouter = require("./routes/product.routes");
const catRouter = require("./routes/category.routes");
const loginRouter = require("./routes/login.routes");
const path = require("path");
app.use("/", loginRouter);

app.use(cors());
app.use(express.json());
app.use("/products", prodRouter);
app.use("/categories", catRouter);
app.use("/", loginRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/signup", async (req, res) => {
  res.status(200).json({ message: "Signup successful" });
});

app.post("/validate_captcha", async (req, res) => {
  const captchaValue = req.body.captchaValue;
  const SECRET_KEY = "6LfGuYQpAAAAABGr8wDcXVY0wjBUcYUb6q21HZWL";
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${captchaValue}`
  );
  console.log(data);
  res.status(200).json(data);
});

app.listen(5040, () => {
  console.log("Server is running...");
});
