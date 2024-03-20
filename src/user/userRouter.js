const router = require("express").Router();
const {
  allUsers,
  userById,
  addUser,
  upUser,
  userDelete,
  loginUser
} = require("./userControllers");
const fileUpload = require("../util/handleStorage");
const validatorCreateUser = require("../validators/userValidators");
const loginValidator = require("../validators/loginValidators");



router.get("/", allUsers);
router.get("/:id", userById);validatorCreateUser
router.post("/", fileUpload.single("file"), validatorCreateUser, addUser);
router.delete("/:id", userDelete);
router.patch("/:id",  fileUpload.single("file"), validatorCreateUser, upUser);
router.post("/login", loginValidator ,loginUser)

module.exports = router;

