// const firebase = require("../db");
// const firestore = firebase.firestore();
// const UserModel = require("../models/users");

// const bcrypt = require("bcryptjs");

// //password hashing
// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };

// const addUser = async (req, res, next) => {
//   try {
//     const { email, password, contact, status, totalcredit, userType } =
//       req.body;
//     const hashedPassword = await hashPassword(password);

//     const userData = {
//       email: email,
//       password: hashedPassword, // Store hashed password
//       contact: contact,
//       status: status,
//       totalcredit: totalcredit,
//       userType: userType,
//     };

//     await firestore.collection("users").doc().set(userData);
//     res.send("User added successfully");
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

// // Function to authenticate a user
// const authenticateUser = async (email, password) => {
//   const usersCollection = firestore().collection("users");

//   try {
//     const data = await usersCollection.where("email", "==", email).get();

//     if (!data.empty) {
//       const userData = data.docs[0].data();

//       //use bcrypt and compare password
//       const isPasswordValid = await bcrypt.compare(password, userData.password);
//       if (isPasswordValid) {
//         const user = new UserModel(
//           data.docs[0].id,
//           userData.email,
//           userData.contact,
//           userData.password,
//           userData.status,
//           userData.totalcredit,
//           userData.userType
//         );
//         return user;
//       }
//     }
//     return null;
//   } catch (error) {
//     throw error;
//   }
// };

// const isManager = (user) => {
//   return user && user.userType === "manager";
// };

// module.exports = {
//   authenticateUser,
//   isManager,
// };

const firebase = require("../db");
const firestore = firebase.firestore();
const UserModel = require("../models/users");

const bcrypt = require("bcryptjs");

// Password hashing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const addUser = async (req, res, next) => {
  try {
    const { email, password, contact, status, totalcredit, userType } =
      req.body;
    const hashedPassword = await hashPassword(password);

    const userData = {
      email: email,
      password: hashedPassword, // Store hashed password
      contact: contact,
      status: status,
      totalcredit: totalcredit,
      userType: userType,
    };

    await firestore.collection("users").doc().set(userData);
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Function to authenticate a user
const authenticateUser = async (email, password) => {
  const usersCollection = firestore.collection("users"); // Removed the extra parentheses

  try {
    const data = await usersCollection.where("email", "==", email).get();

    if (!data.empty) {
      const userData = data.docs[0].data();

      // Use bcrypt to compare password
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (isPasswordValid) {
        const user = new UserModel(
          data.docs[0].id,
          userData.email,
          userData.contact,
          userData.password,
          userData.status,
          userData.totalcredit,
          userData.userType
        );
        return user;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const isManager = (user) => {
  return user && user.userType === "manager";
};

module.exports = {
  authenticateUser,
  isManager,
  addUser,
};
