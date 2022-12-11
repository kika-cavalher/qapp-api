const router = require("express").Router();
const UserController = require("../controllers/UserController");

const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/signup", UserController.register);
router.post("/signin", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);
router.post("/upload/:id", UserController.uploadFile);

module.exports = router;
