const User = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");
const { hashPassword, isPasswordMatch } = require("../utils/password");

// REGISTER
const createUserIntoDB = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  userData.password = await hashPassword(userData.password);

  const user = await User.create(userData);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// LOGIN
const loginUserFromDB = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user || !(await isPasswordMatch(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

//USER ROLE UPDATE IN DB
const updateUserRoleIntoDB = async (id, role) => {
  // Update User
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true },
  ).select("-password");

  // Check User
  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

module.exports = {
  createUserIntoDB,
  loginUserFromDB,
  updateUserRoleIntoDB,
};
