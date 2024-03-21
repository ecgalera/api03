const router = require("express").Router()
const {  addPosts, getAll, allPostsWith } = require("../posts/postsController");
const isAuth = require("../middleware/isAuth")
const postsValidator = require("../validators/postsValidators")


// router.get("/", allPostsWith);
router.get("/", allPostsWith)
router.post("/", isAuth, postsValidator , addPosts)

module.exports = router