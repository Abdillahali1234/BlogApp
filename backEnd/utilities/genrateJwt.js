const jwt = require("jsonwebtoken");

const generateJwt = async (payload) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const token = await jwt.sign(payload, SECRET_KEY);
  return token;
};

module.exports = {generateJwt};