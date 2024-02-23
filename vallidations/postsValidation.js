const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });


const postsSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 10,
    },

    subtitle: {
      type: "string",
      minLength: 1,
      maxLength: 10,
    },
    author: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
          minLength: 1,
          maxLength: 10,
        },
        lastName: {
          type: "string",
          minLength: 1,
          maxLength: 10,
        },
        age: {
          type: "integer",
          minimum: 18,
          maximum: 100,
        },
      },
      required: ["firstName", "lastName"],
    },
  },

  required: ["title", "author"],
  additionalProperties: false,
};

const patchSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 10,
    },

    subtitle: {
      type: "string",
      minLength: 1,
      maxLength: 10,
    },
    author: {
      type: "object",
      properties: {
        firstName: {
          type: "string",
          minLength: 1,
          maxLength: 10,
        },
        lastName: {
          type: "string",
          minLength: 1,
          maxLength: 10,
        },
        age: {
          type: "integer",
          minimum: 18,
          maximum: 100,
        },
      },
      required: ["firstName", "lastName"],
    },
  },

  minProperties: 1,
  additionalProperties: false,
};

function validate(schema) {
  return (req, res, next) => {
    const validateSchema = ajv.compile(schema);

    const valid = validateSchema(req.body);

    if (!valid) {
      const errors = validateSchema.errors.map((err) => {
        return err.instancePath
          ? err.instancePath + "" + err.message
          : err.message;
      });
      res.status(400).json({ message: "Validation errors", errors });
    } else {
      next();
    }
  };
}

module.exports = {
  postsSchema,
  patchSchema,
  validate,
};

// const postsSchema = {
//   title: {
//     type: "string",
//     maxLength: 15,
//     minLength: 8,
//     required: true,
//   },
//   subtitle: {
//     type: "string",
//     maxLength: 50,
//     minLength: 10,
//     required: false,
//   },
//   author: {
//     type: "object",
//     schema: {
//       firstName: {
//         type: "string",
//         maxLength: 15,
//         minLength: 1,
//         required: true,
//       },
//       lastName: {
//         type: "string",
//         maxLength: 20,
//         minLength: 1,
//         required: true,
//       },
//       age: {
//         type: "number",
//         min: 18,
//         max: 100,
//         required: true,
//       },
//     },
//     required: true,
//   },
// };

// const patchSchema = {
//   title: {
//     type: "string",
//     maxLength: 15,
//     minLength: 8,
//     required: false,
//   },
//   subtitle: {
//     type: "string",
//     maxLength: 50,
//     minLength: 10,
//     required: false,
//   },
//   author: {
//     type: "object",
//     schema: {
//       firstName: {
//         type: "string",
//         maxLength: 15,
//         minLength: 0,
//         required: true,
//       },
//       lastName: {
//         type: "string",
//         maxLength: 20,
//         minLength: 0,
//         required: true,
//       },
//       age: {
//         type: "number",
//         min: 18,
//         max: 100,
//         required: true,
//       },
//     },
//     required: false,
//   },
// };

// const validateObject = (obj, schema) => {
//   let isValid = true;
//   let errors = [];

//   Object.keys(schema).forEach((key) => {
//     const field = schema[key];
//     const value = obj[key];

//     if (field.required && (value === undefined || value === null)) {
//       isValid = false;
//       errors.push(`${key} is required`);
//       return;
//     }

//     if (value === undefined) {
//       return;
//     }

//     if (typeof value !== field.type) {
//       isValid = false;
//       errors.push(`${key} must be a ${field.type}`);
//       return;
//     }

//     if (field.type === "string") {
//       if (value.length < field.minLength || value.length > field.maxLength) {
//         isValid = false;
//         errors.push(
//           `${key} must be between ${field.minLength} and ${field.maxLength} characters`
//         );
//       }
//     } else if (field.type === "number") {
//       if (value < field.min || value > field.max) {
//         isValid = false;
//         errors.push(`${key} must be between ${field.min} and ${field.max}`);
//       }
//     }

//     if (field.type === "object") {
//       const result = validateObject(value, field.schema);
//       if (!result.isValid) {
//         isValid = false;
//         // Append nested errors with key prefix
//         result.errors.forEach((error) => {
//           errors.push(`${key}.${error}`);
//         });
//       }
//     }
//   });

//   return { isValid, errors };
// };

// function validate(schema) {
//   return (req, res, next) => {
//     const { isValid, errors } = validateObject(req.body, schema);
//     if (!isValid) {
//       res.status(400).json({ message: "Validation errors", errors });
//     } else {
//       next();
//     }
//   };
// }

// module.exports = {
//   postsSchema,
//   patchSchema,
//   validate,
// };

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
