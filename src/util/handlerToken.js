const jwt = require("jsonwebtoken");

const jwt_secret = process.env.jwt_secret;

const tokenSign = async (user) => {
  try {
    return jwt.sign(user, jwt_secret, { expiresIn: "1h" });
  } catch (error) {
    return error;
  }
};

const tokenVerify = async (token) => {
  try {
    return jwt.verify(token, jwt_secret);
  } catch (error) {
    return error;
  }
};

module.exports = { tokenSign, tokenVerify };
