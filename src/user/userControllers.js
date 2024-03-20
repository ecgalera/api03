const notNumber = require("../util/isNaN");
const {
  getAllUsers,
  getUserById,
  createNewUsers,
  updateUser,
  deleteUser,
  login,
} = require("./userModelos");
const { hashPassword, checkPassword } = require("../util/handlerPassword.js");
require("dotenv").config();
const fs = require("node:fs");
const { tokenSign } = require("../util/handlerToken.js");


const allUsers = async (req, res, next) => {
  const dbResponse = await getAllUsers();
  if (dbResponse instanceof Error) return next(error);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

const userById = async (req, res, next) => {
  notNumber(+req.params.id, next);
  const dbResponse = await getUserById(req.params.id);
  if (dbResponse instanceof Error) return next(error);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

const register = async (req, res, next) => {
  const image = `${process.env.public_url}/${req.file.filename}`;
  const password = await hashPassword(req.body.password);
  const dbResponse = await createNewUsers({ ...req.body, password, image });
  if (dbResponse instanceof Error) return next(dbResponse);

  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  const tokenData = {
    token: await tokenSign(user),
    user: user,
  };
  res.status(200).json({
    message: `El usuario ${req.body.name} fue creado !!!`,
    token_info: tokenData,
  });
};

const upUser = async (req, res, next) => {
  notNumber(+req.params.id, next);
  const image = `${process.env.public_url}/${req.file.filename}`;
  const password = await hashPassword(req.body.password);
  const dbResponse = await updateUser(+req.params.id, {
    ...req.body,
    password,
    image,
  });
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows ? res.status(200).json(req.body) : next();
};

const userDelete = async (req, res, next) => {
  const dbResponse = await deleteUser(+req.params.id);
  if (dbResponse instanceof Error) return next(error);
  dbResponse.affectedRows
    ? res
        .status(200)
        .json({ message: `User eliminado con Id: ${req.params.id}` })
    : next();
};

const loginUser = async (req, res, next) => {
  const dbResponse = await login(req.body.email);
  const passwordMatch = await checkPassword(
    req.body.password,
    dbResponse[0].password
  );
  if (passwordMatch) {
    const user = {
      id: dbResponse[0].id,
      name: dbResponse[0].name,
      email: dbResponse[0].email,
    };

    tokenData = {
      token: await tokenSign(user),
      user: user,
    };

    res
      .status(200)
      .json({ message: `User ${user.name} autorizado`, jwt: tokenData });
  } else {
    let error = new Error("Unauthorized");
    error.status = 401;
    next();
  }
};

module.exports = {
  allUsers,
  userById,
  register,
  upUser,
  userDelete,
  loginUser,
};
