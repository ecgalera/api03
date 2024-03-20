// Establezco la conexión con la base de datos:
const connections = require("../../db/db.config");

// getAllUsers---------------------------------

const getAllUsers = async () => {
  const query = "SELECT * FROM user";
  try {
    const user = await connections.query(query);
    return user;
  } catch (error) {
    return { error: error.code };
  }
};

// getUserById---------------------------------

const getUserById = async (id) => {
  const query = `SELECT * FROM user WHERE id=${id}`;
  try {
    const userById = await connections.query(query);
    return userById;
  } catch (error) {
    return { error: error.code };
  }
};

// createNewUsers------------------------------

const createNewUsers = async (user) => {
  const query = "INSERT INTO user SET ?"
  try {
    const addUser = await connections.query(query, user);
    return addUser;
  } catch (error) {
    return { error: error.code };
  }
};

// updateUser----------------------------------

const updateUser = async (id, user) => {
  const query = `UPDATE user SET ? WHERE id=${id}`;
  try {
    const update = connections.query(query, user);
    return update;
  } catch (error) {
    return { error: error.code };
  }
};

// deleteUser----------------------------------

const deleteUser = async (id) => {
  const query = `DELETE FROM user WHERE id = ${id}`;
  try {
    const deletUser = await connections.query(query);
    return deletUser;
  } catch (error) {
    return { error: error.code };
  }
};

const login = async(email) =>{
  const query = `SELECT * FROM user WHERE email= "${email}"`;
  try {
    return loginUsers = await connections.query(query)
  } catch (error) {
    return {error: error.code}
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createNewUsers,
  updateUser,
  deleteUser,
  login
}