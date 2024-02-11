const { error } = require("console");

const postsSchema = {
  title: {
    type: "string",
    maxLength: 15,
    minLength: 8,
    required: true,
  },
  subtitle: {
    type: "string",
    maxLength: 50,
    minLength: 10,
    required: false,
  },
  author: {
    type: "object",
    schema: {
      firstName: {
        type: "string",
        maxLength: 15,
        minLength: 0,
        required: true,
      },
      lastName: {
        type: "string",
        maxLength: 20,
        minLength: 0,
        required: true,
      },
      age: {
        type: "number",
        min: 18,
        max: 100,
        required: true,
      },
    },
    required: true,
  },
};

const patchSchema = {
  title: {
    type: "string",
    maxLength: 15,
    minLength: 8,
    required: false,
  },
  subtitle: {
    type: "string",
    maxLength: 50,
    minLength: 10,
    required: false,
  },
  author: {
    type: "object",
    schema: {
      firstName: {
        type: "string",
        maxLength: 15,
        minLength: 0,
        required: true,
      },
      lastName: {
        type: "string",
        maxLength: 20,
        minLength: 0,
        required: true,
      },
      age: {
        type: "number",
        min: 18,
        max: 100,
        required: true,
      },
    },
    required: false,
  },
};

const validate = (obj, schema) => {
  let isValid = true;
  let message = [];
  if (typeof obj !== "object" || obj.length !== undefined) {
    isValid = false;
    return { isValid, error: new Error(" Not an object.") };
  }
  const props = Object.keys(schema);
  const objectKeys = Object.keys(obj);
  if (!objectKeys.length) {
    return { isValid: false, error: new Error(" Object is empty.") };
  }

  props.forEach((prop) => {
    let propertyIs = obj.hasOwnProperty(prop);
    if (!propertyIs && schema[prop].required) {
      isValid = false;
      message.push(" Properties are incomplete");
    }
    if (typeof obj[prop] !== schema[prop].type) {
      if (propertyIs) {
        isValid = false;
        message.push(` Type of ${prop} should be ${schema[prop].type}`);
      }
    }
    if (typeof obj[prop] === "string") {
      if (obj[prop].length < schema[prop].minLength) {
        isValid = false;
        message.push(` ${prop} is too short`);
      } else if (obj[prop].length > schema[prop].maxLength) {
        isValid = false;
        message.push(` ${prop} is too long`);
      }
    }
    if (typeof obj[prop] === "number") {
      if (obj[prop] > schema[prop].max) {
        isValid = false;
        message.push(` ${prop} is too old`);
      } else if (obj[prop] < schema[prop].min) {
        isValid = false;
        message.push(` ${prop} is to small`);
      }
    }
    if (typeof obj[prop] === "object") {
      let result = validate(obj[prop], schema[prop].schema);
      if (!result.isValid) {
        isValid = false;
        message.push(` ${prop} doesn't have ${result.error}`);
      }
    }
  });

  return { isValid, error: message ? new Error(message) : null };
};

module.exports = {
  patchSchema,
  postsSchema,
  validate,
};

/* const post1 = {
  title: "First Post",
  subtitle: "All true post",
  author: {
    firstName: "Yura",
    lastName: "Khachatryan",
    age: 22,
  },
};

const post2 = {
  title: "Second post",
  subtitle: "test author type",
  author: "",
};

const post3 = {
  title: "Third post",
  subtitle: "test author firstname",
  author: {
    firstName: "jsbvksvvbukyvbuyvyubvlyuabvliaebvsdkvkayefa",
    lastName: "Simonyan",
    age: 19,
  },
};

const post4 = {
  title: "Fourth post",
  subtitle: "test author lastname",
  author: {
    firstName: "Arpine",
    lastName: "asuhfiaerhgsieurhgseiuhgeirugheriugheiaruhgiaeurhgiuerhgilaer",
    age: 21,
  },
};

const post5 = {
  title: "Fifth post",
  subtitle: "test author age",
  author: {
    firstName: "Davit",
    lastName: "Sasunci",
    age: 7000,
  },
};

const post6 = {
  title: "Sixth post",
  subtitle: ["test subtitle type"],
  author: {
    firstName: "Karine",
    lastName: "Soxomonyan",
    age: 28,
  },
};

const post7 = {
  title: "Seventh post",
  author: {
    firstName: "Karine",
    lastName: "Soxomonyan",
    age: 24,
  },
};

const post8 = {
  title: 12,
  subtitle: "test title type post8",
  author: {
    firstName: "Hayk",
    lastName: "Nahapetyan",
    age: 30,
  },
};

const post9 = {
  subtitle: "test no title post 9",
  author: {
    firstName: "Davit",
    lastName: "Sasunyan",
    age: 40,
  },
};

const post10 = [];

const posts = [
  post1,
  post2,
  post3,
  post4,
  post5,
  post6,
  post7,
  post8,
  post9,
  post10,
];

const test = (posts = [], schema) => {
  let isValid = true;
  let count = 0;
  let message = [];
  if (posts.length === 0) {
    return "No post!!";
  } else {
    posts.forEach((prop) => {
      let result = validate(prop, schema);
      isValid = result.isValid;
      message = result.error;
      if (isValid) {
        count++;
        console.log(`${count} post is valid ${result[2]}\n`);
      } else {
        count++;
        console.log(
          `${count} post is invalid!!\nerror message: ${message}\n              `
        );
      }
    });
  }
};

test(posts, postsSchema);
 */
