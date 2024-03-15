const router = require("express").Router();
const {
  allUsers,
  userById,
  addUser,
  upUser,
  userDelete,
} = require("./userControllers");

router.get("/", allUsers);
router.get("/:id", userById);
router.post("/", addUser);
router.delete("/:id", userDelete);
router.patch("/:id", upUser);

module.exports = router;

