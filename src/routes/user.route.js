const express = require("express");

const {
  createUser,
  loginUser,
  getUser,
  getMe,
  logoutUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/user.controller");

const checkAuthentication = require("../middleware/auth");
const checkRole = require("../middleware/role");

const userRouter = express.Router();

// Register
userRouter.post("/register", createUser);

// Login
userRouter.post("/login", loginUser);

// Logged-in user
userRouter.get("/me", checkAuthentication, getMe);

//Logout user
userRouter.post("/logout", logoutUser);

// Admin users list
userRouter.get("/users", checkAuthentication, checkRole("moderator"), getUser);

//Update role
userRouter.patch(
  "/users/:id/role",
  checkAuthentication,
  checkRole("super-admin"),
  updateUserRole,
);

//Delete User
userRouter.delete(
  "/users/:id",
  checkAuthentication,
  checkRole("super-admin"),
  deleteUser,
);

module.exports = userRouter;
