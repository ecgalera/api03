const router = require("express").Router();
const {
  allUsers,
  userById,
  register,
  upUser,
  userDelete,
  loginUser
} = require("./userControllers");
const fileUpload = require("../util/handleStorage");
const validatorCreateUser = require("../validators/userValidators");
const loginValidator = require("../validators/loginValidators");
// const isAuth = require("../middleware/isAuth")



router.get("/", allUsers);
router.get("/:id", userById);validatorCreateUser
router.post("/register", fileUpload.single("file"), validatorCreateUser, register);
router.delete("/:id", userDelete);
router.patch("/:id",  fileUpload.single("file"), validatorCreateUser, upUser);
router.post("/login", loginValidator ,loginUser)

module.exports = router;

