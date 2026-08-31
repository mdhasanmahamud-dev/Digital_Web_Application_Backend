const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const isPasswordMatch = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

module.exports = {
  hashPassword,
  isPasswordMatch,
};
