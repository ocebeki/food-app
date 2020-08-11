const bcrypt = require("bcrypt");

const generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
const validPassword = (password1, password2) => {
  return bcrypt.compareSync(password1, password2);
};

const validateUser = (user) => {
  if (!user.email) return "Error: Email cannot be blank.";
  else if (!user.password) return "Error: Password cannot be blank.";
  else if (!user) return "Invalid user";
  else return "";
};

module.exports = { generateHash, validPassword, validateUser };
