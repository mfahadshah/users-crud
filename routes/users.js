const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

// @route   POST api/users/
// @desc    Create user
// @access  Private
router.post(
  "/",
  auth,
  [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").isEmail().trim(),
  ],
  userController.CreateUser
);

// @route   GET api/users/:id
// @desc    Get user
// @access  Private
router.get("/:id", auth, userController.GetUser);

// @route   GET api/users/
// @desc    Get users
// @access  Private
router.get("/", auth, userController.GetUsers);

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put("/:id", auth, userController.UpdateUser);

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Private
router.delete("/:id", auth, userController.DeleteUser);
module.exports = router;
