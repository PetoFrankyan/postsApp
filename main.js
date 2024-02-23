// imports
const express = require("express");
const dotenv = require("dotenv");
const postRouter = require("./routes/posts.route.js");
const postsEvents = require("./events.js");
const { getPosts } = require("./controllers/postControllers.js");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
// app.use(express.text())

app.use((req, res, next) => {
  req.time = new Date();
  next();
});

getPosts();

app.use("/posts", postRouter);
app.use("/posts/:id", postRouter);

app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`);
});
