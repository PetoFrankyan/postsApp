// imports
const express = require("express");
const router = express.Router();
// local modules
const {
  postsSchema,
  patchSchema,
  validate,
} = require("../vallidations/postsValidation.js");
const {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  getPostsbylimit,
} = require("../controllers/postControllers.js");
const postsEvents = require("../events.js");
const currentPost = require("../middlewares/middlewares.js");

router.post("/", validate(postsSchema), (req, res) => {
  createPost(req.body)
    .then((createdPost) => {
      res.status(201).send(createdPost);
      postsEvents.emit("postCreated", createdPost);
    })
    .catch((err) => {
      console.error("error", err);
      res.status(500).send({
        message: "Something went wrong.",
      });
    });
});

router.get("/", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  getPostsbylimit(offset, limit)
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((err) => {
      console.error("error", err);
      res.status(500).send(JSON.stringify({ message: "Something wnet wrong" }));
    });
});

router.get("/:id", currentPost, (req, res) => {
  const currentPost = req.currentPost;
  res.send(currentPost);
  // currentPost(id)
  //   .then((post) => {
  //     res.send(JSON.stringify(post));
  //   })
  //   .catch((err) => {
  //     console.error("error", err);
  //     res.status(500).send(JSON.stringify({ message: "Something wnet wrong" }));
  //   });
});

// isPostExist
router.put("/:id" , validate(postsSchema), (req, res) => {
  const currentPost = req.currentPost;
  const updatedPost = req.body;
  updatePost(currentPost, updatedPost, (isPatch = "PATCH"))
    .then((post) => {
      console.log("post updated", post);
      res.status(200).send(post);
    })
    .catch((err) => {
      console.error("error", err);
      res.status(500).send({
        message: validation.error.message,
      });
    });
});

router.patch("/:id", validate(patchSchema), (req, res) => {
  const updatedPost = req.body;
  getPosts().then((receivedPosts) => {
    currentPost(id).then((post) => {
      postIndex = post.id - 1;
      updatePost(receivedPosts, postIndex, updatedPost, (isPatch = "PATCH"))
        .then((post) => {
          console.log("post updated", post);
          res.status(200).send(post);
        })
        .catch((err) => {
          console.error("error", err);
          res.status(500).send({
            message: validation.error.message,
          });
        });
    });
  });
});

router.delete("/:id", currentPost, (req, res) => {
  getPosts().then((receivedPosts) => {
    const id = req.params.id;
    currentPost(id).then((post) => {
      postIndex = post.id - 1;
      deletePost(receivedPosts, postIndex)
        .then(() => {
          res.status(200).send({
            message: `Post with id - ${id} successfully deleted`,
          });
        })
        .catch((err) => {
          console.error("error", err);
          res.status(500).send({
            message: validation.error.message,
          });
        });
    });
  });
});

module.exports = router;
