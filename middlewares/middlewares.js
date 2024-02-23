const { getPosts } = require("../controllers/postControllers");

const currentPost = (req, res, next) => {
  const id = req.params.id;
  return new Promise((resolve, reject) => {
    getPosts()
      .then((receivedPosts) => {
        const postIndex = receivedPosts.findIndex((el) => el.id === Number(id));
        if (postIndex !== -1) {
          req.currentPost = receivedPosts[postIndex];
          next();
        } else {
          res
            .status(500)
            .send(JSON.stringify({ message: "Something wnet wrong" }));
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

module.exports = currentPost;
