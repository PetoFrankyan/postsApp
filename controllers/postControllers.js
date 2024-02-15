const fs = require("fs");
const postsFilePath = "./posts.json";

const getPosts = () => {
  let posts = [];
  return new Promise((resolve, reject) => {
    fs.readFile(postsFilePath, (err, data) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }

      posts = data.toString("utf8");
      resolve(JSON.parse(posts));
    });
  });
};

const createPost = (post) => {
  return new Promise((resolve, reject) => {
    getPosts().then((data) => {
      const length = data.length;
      let id;
      if (!length) {
        id = 1;
      } else {
        id = data[length - 1].id + 1;
      }
      post.id = id;
      data.push(post);
      fs.writeFile(postsFilePath, JSON.stringify(data), (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve(post);
      });
    });
  });
};

const updatePost = (currentPosts, index, newData, isPatch) => {
  console.log(index);
  if (!isPatch) {
    currentPosts[index] = { ...newData, id: currentPosts[index].id };
  } else {
    currentPosts[index] = { ...currentPosts[index], ...newData };
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(postsFilePath, JSON.stringify(currentPosts), (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(currentPosts[index]);
    });
  });
};

const deletePost = (receivedPosts, postIndex) => {
  receivedPosts.splice(postIndex, 1);
  return new Promise((resolve, reject) => {
    fs.writeFile(postsFilePath, JSON.stringify(receivedPosts), (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve();
    });
  });
};

const currentPost = (id) => {
  return new Promise((resolve, reject) => {
    getPosts()
      .then((receivedPosts) => {
        const postIndex = receivedPosts.findIndex((el) => el.id === Number(id));
        if (postIndex !== -1) {
          console.log(receivedPosts[postIndex]);
          resolve(receivedPosts[postIndex]);
        } else {
          reject(error.message);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

const getPostsbylimit = async (offset, limit) => {
  try {
    const posts = await getPosts();
    return posts.splice(offset, limit);
  } catch (err) {
    throw new Error(
      `Not able to get posts with offset ${offset} and limit ${limit}`
    );
  }
};

module.exports = {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  currentPost,
  getPostsbylimit,
};
