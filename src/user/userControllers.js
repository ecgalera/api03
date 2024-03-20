const notNumber = require("../util/isNaN");
const {
  getAllUsers,
  getUserById,
  createNewUsers,
  updateUser,
  deleteUser,
  login
} = require("./userModelos");
const { hashPassword, checkPassword } = require("../util/handlerPassword.js");
require("dotenv").config();
const fs = require("node:fs")

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

const addUser = async (req, res, next) => {
  const image = `${process.env.public_url}/${req.file.filename}`;
  const password = await hashPassword(req.body.password);
  const dbResponse = await createNewUsers({ ...req.body, password, image });
  if (dbResponse instanceof Error) {
    return next();
  } else {
    res.status(200).json(`El usuario ${req.body.name} fue creado !!!`);
  }
};


const upUser = async (req, res, next) => {
  notNumber(+req.params.id, next);
  const image = `${process.env.public_url}/${req.file.filename}`
  const password = await hashPassword(req.body.password);
  const dbResponse = await updateUser(+req.params.id, {...req.body, password,image});
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

const loginUser = async (req, res, next) =>{
  const dbResponse = await login(req.body.email);
  const passwordMatch = await checkPassword(req.body.password, dbResponse[0].password);
  if(passwordMatch){
    res.redirect(302,"/user")
  }else{
    let error = new Error("Unauthorized");
    error.status = 401;
    next();
  }
  
}

module.exports = {
  allUsers,
  userById,
  addUser,
  upUser,
  userDelete,
  loginUser
};





