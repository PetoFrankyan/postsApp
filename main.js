// imports
const express = require("express");
const dotenv = require("dotenv");
const postRouter = require("./routes/posts.route.js");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
// app.use(express.text())

app.use((req, res, next) => {
  req.time = new Date();
  next();
});

app.use("/posts", postRouter);
app.use("/posts/:id", postRouter);

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});
