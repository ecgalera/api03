const { tokenVerify, tokenVerify } = require("../util/handlerToken");

const isAuth = async (req, res, next) => {
  try {
    if (!req.header.authorization) {
      let error = new Error("No token");
      error.status = 401;
      return next(error);
    }

    const token = req.header.authorization.split(" ").pop();
    const validToken = await tokenVerify(token);
    console.log(validToken)

    if (validToken instanceof Error) {
      error.message = "Token expired";
      error.status = 403;
      return next(erro);
    }

    req.user = validToken;
    console.log(req.user)
    next();
  } catch (error) {
    error.status = 401;
    error.message = "Rechazado";
    return next(error);
  }
};

module.exports = isAuth;
