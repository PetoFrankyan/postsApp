const EventEmitter = require("events");
const fs = require("fs");
const cachePath = "./cache.js";

const myEvets = new EventEmitter(); 

// myEvets.on("hello", (name) => {
//   console.log(`Hello ${name}`);
// });

// myEvets.emit("hello", "Hakob");
// myEvets.emit("hello", "Gago");

const postsEvents = new EventEmitter();

postsEvents.on("updateCache", (parsedPosts) => {
  fs.writeFileSync(
    cachePath,
    `let cache = ${JSON.stringify(parsedPosts)} \n module.exports = cache `
  );
});

function sendEmailtoAdmin(id, title) {
  console.log(
    `Email sent to admin for post with id ${id} and with title ${title}`
  );
}

postsEvents.on("postCreated", (post) => {
  sendEmailtoAdmin(post.id, post.title);
});

module.exports = postsEvents;
