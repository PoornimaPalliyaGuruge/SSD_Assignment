const firebase = require("../db");
const firestore = firebase.firestore();
const UserModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import JWT
const { validationResult } = require("express-validator");
require("dotenv").config(); // Load .env variables

// Password hashing
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Add User function
const addUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, contact, userType } = req.body;
    const hashedPassword = await hashPassword(password);

    const userExists = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userExists.empty) {
      return res.status(400).send("Email already exists");
    }

    const userData = {
      email,
      password: hashedPassword,
      contact,
      status: "no status",
      totalcredit: 0,
      userType,
    };

    await firestore.collection("users").doc().set(userData);
    res.send("User added successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Authenticate User and return JWT
const authenticateUser = async (email, password) => {
  const usersCollection = firestore.collection("users");

  try {
    const data = await usersCollection.where("email", "==", email).get();

    if (!data.empty) {
      const userData = data.docs[0].data();

      // Validate password
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

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userType: user.userType,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Middleware to check if user is a manager (protected route example)
const isManager = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType === "manager") {
      req.user = decoded;
      next();
      console.log("manager");
    } else {
      res.status(403).send("Access denied. Not a manager.");
    }
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = {
  authenticateUser,
  isManager,
  addUser,
  generateToken,
};
