const notNumber = require("../util/isNaN");
const {
  getAllUsers,
  getUserById,
  createNewUsers,
  updateUser,
  deleteUser,
} = require("./userModelos");

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
  const { id, name, email, password } = req.body;
  const dbResponse = await createNewUsers({ id, name, email, password });
  if(dbResponse instanceof Error) {return next()}else{
    res.status(200).json(`El usuario ${req.body.name} fue creado !!!`)
  };
  };
  


const upUser = async (req, res, next) => {
  notNumber(+req.params.id, next);
  const dbResponse = await updateUser(+req.params.id, { ...req.body });
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

module.exports = {
  allUsers,
  userById,
  addUser,
  upUser,
  userDelete,
};

