const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");

// Login route (Generates JWT token)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").trim(),
  ],
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userController.authenticateUser(email, password);

      if (user) {
        const token = userController.generateToken(user);
        res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Register route (Add User)
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email").normalizeEmail(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .trim()
      .escape(),
    body("contact")
      .isNumeric()
      .withMessage("Contact must be numeric")
      .trim()
      .escape(),
    body("userType")
      .isIn(["Passenger", "Driver"])
      .withMessage("Invalid user type"),
  ],
  userController.addUser
);

module.exports = {
  routes: router,
};
